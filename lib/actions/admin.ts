'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getSessionUser } from './session'

export async function changeUserRole(
    targetUserId: string,
    role: 'user' | 'admin'
) {
    const supabase = await createClient()

    const session = await getSessionUser()

    if (!session?.id) {
        return { success: false, message: 'Unauthorized' }
    }

    if (session.role !== 'admin') {
        return { success: false, message: 'Forbidden' }
    }

    if (session.id === targetUserId && role === 'user') {
        return { success: false, message: 'You cannot remove your own admin role' }
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            role: role,
            updated_at: new Date().toISOString()
        })
        .eq('id', targetUserId)

    if (error) {
        return { success: false, message: error.message }
    }

    revalidatePath('/admin')

    return {
        success: true,
        message: `Role updated to ${role}`
    }
}

type AuditInput = {
    tableName: string
    recordId: string
    action: 'INSERT' | 'UPDATE' | 'DELETE'
    oldData?: unknown
    newData?: unknown
}

export async function createAuditTrail({
    tableName,
    recordId,
    action,
    oldData,
    newData
}: AuditInput) {
    const supabase = await createClient()

    const session = await getSessionUser()

    const changedBy = session?.id ?? null

    const { error } = await supabase
        .from('audit_trail')
        .insert({
            table_name: tableName,
            record_id: recordId,
            action,
            old_data: oldData ?? null,
            new_data: newData ?? null,
            changed_by: changedBy
        })

    if (error) {
        console.error('Audit Trail Error:', error)
        return {
            success: false,
            message: 'Failed to create audit log'
        }
    }

    return {
        success: true
    }
}