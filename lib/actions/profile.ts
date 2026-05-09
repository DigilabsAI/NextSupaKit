'use server'

import { revalidatePath } from 'next/cache'
import { getSessionUser } from './session'
import { createClient } from '../supabase/server'
import { redirect } from 'next/navigation'

export async function getProfile() {
    const session = await getSessionUser()

    const user_id = session?.id
    if (!user_id) return undefined

    const supabase = await createClient()
    const { data } = await supabase
        .from('profiles')
        .select('fullname, gender, mobile_number, avatar_url')
        .eq('id', user_id)
        .single()

    if (!data) return undefined

    const [firstName, ...last] = (data.fullname ?? '').split(' ')
    const lastName = last.join(' ')

    return {
        firstName,
        lastName,
        mobile: data.mobile_number ?? undefined,
        gender: data.gender ?? undefined,
        avatarUrl: data.avatar_url ?? undefined
    }
}

export async function getAllProfiles() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select(`
      id,
      fullname,
      gender,
      mobile_number,
      avatar_url,
      email,
      role,
      created_at
    `)
        .order("role", { ascending: true })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getAllProfiles error:", error);
        return [];
    }

    return data ?? [];
}

export async function savePersonalInfo(formData: FormData) {
    const supabase = await createClient()


    const session = await getSessionUser()
    const user_id = session?.id

    if (!user_id) {
        redirect('/auth/login') // Redirect to login if not authenticated
    }

    const firstName = String(formData.get('firstName') ?? '').trim()
    const lastName = String(formData.get('lastName') ?? '').trim()
    const mobile = String(formData.get('mobile') ?? '').trim()
    const gender = String(formData.get('gender') ?? '').trim()

    const fullname = `${firstName} ${lastName}`.trim()

    const payload = {
        fullname: fullname || null,
        mobile_number: mobile || null,
        gender: gender || null,
        updated_at: new Date().toISOString()
    }


    const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user_id)
        .select()

    if (error) {
        console.error('Supabase update error:', error)
        return undefined
    }

    revalidatePath('/settings')

    return {
        data: {
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            mobile: mobile || undefined,
            gender: gender || undefined
        }
    }
}
export async function uploadAvatar(file: File) {
    const supabase = await createClient()

    const session = await getSessionUser()
    const user_id = session?.id

    if (!user_id) {
        return { success: false, message: 'Unauthorized' }
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
    const filePath = `${user_id}/avatar.${ext}`

    // remove old possible avatar files first
    const possibleFiles = [
        `${user_id}/avatar.png`,
        `${user_id}/avatar.jpg`,
        `${user_id}/avatar.jpeg`,
        `${user_id}/avatar.webp`,
        `${user_id}/avatar.gif`,
    ]

    await supabase.storage.from('profile').remove(possibleFiles)

    const { error: uploadError } = await supabase.storage
        .from('profile')
        .upload(filePath, file, {
            upsert: true,
            contentType: file.type,
        })

    if (uploadError) {
        console.error(uploadError)
        return { success: false, message: 'Failed to upload avatar' }
    }

    const { data } = supabase.storage
        .from('profile')
        .getPublicUrl(filePath)

    // cache bust version
    const avatarUrl = `${data.publicUrl}?v=${Date.now()}`

    const { error: dbError } = await supabase
        .from('profiles')
        .update({
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user_id)

    if (dbError) {
        console.error(dbError)
        return { success: false, message: 'Failed to update profile' }
    }

    return {
        success: true,
        message: 'Avatar uploaded successfully',
        url: avatarUrl,
    }
}

export async function removeAvatar() {
    const supabase = await createClient()

    const session = await getSessionUser()
    const user_id = session?.id

    if (!user_id) {
        return { success: false, message: 'Unauthorized' }
    }

    const possibleFiles = [
        `${user_id}/avatar.png`,
        `${user_id}/avatar.jpg`,
        `${user_id}/avatar.jpeg`,
        `${user_id}/avatar.webp`,
        `${user_id}/avatar.gif`,
    ]

    const { error: storageError } = await supabase.storage
        .from('profile')
        .remove(possibleFiles)

    if (storageError) {
        console.error(storageError)
        return { success: false, message: 'Failed to delete avatar' }
    }

    const { error: dbError } = await supabase
        .from('profiles')
        .update({
            avatar_url: null,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user_id)

    if (dbError) {
        console.error(dbError)
        return { success: false, message: 'Failed to update profile' }
    }

    return {
        success: true,
        message: 'Avatar removed successfully',
    }
}