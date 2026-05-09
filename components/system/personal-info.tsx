'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { UploadCloudIcon, ImageIcon } from 'lucide-react'

import { removeAvatar, savePersonalInfo, uploadAvatar } from '@/lib/actions/profile'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import { profileSchema } from '@/lib/zod-schema/profile'

type Props = {
  data?: {
    firstName?: string
    lastName?: string
    mobile?: string
    gender?: string
    avatarUrl?: string
  }
}

export default function PersonalInfo({ data }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isPending, startTransition] = useTransition()
  const [isUploading, startUpload] = useTransition()
  const [isRemoving, startRemove] = useTransition()

  const [preview, setPreview] = useState(data?.avatarUrl ?? null)
  const [gender, setGender] = useState(data?.gender ?? '')

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    const localPreview = URL.createObjectURL(f)
    setPreview(localPreview)

    startUpload(async () => {
      const res = await uploadAvatar(f)

      if (res?.success) {
        toast.success(res.message)
        setPreview(res.url ?? localPreview)
      } else {
        toast.error(res?.message ?? 'Upload failed')
        setPreview(data?.avatarUrl ?? null)
      }
    })
  }

  const handleRemoveAvatar = () => {
    startRemove(async () => {
      const res = await removeAvatar()

      if (res?.success) {
        toast.success(res.message)
        setPreview(null)
        if (inputRef.current) inputRef.current.value = ''
      } else {
        toast.error(res?.message ?? 'Remove failed')
      }
    })
  }

  const onSubmit = async (formData: FormData) => {
    const values = {
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      mobile: String(formData.get('mobile') ?? '').trim(),
      gender
    }

    const parsed = profileSchema.safeParse(values)

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid form')
      return
    }

    formData.set('gender', gender)

    startTransition(async () => {
      const res = await savePersonalInfo(formData)

      if (res) toast.success('Profile updated successfully')
      else toast.error('Failed to save profile')
    })
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="flex flex-col gap-8 py-4 lg:flex-row lg:items-start lg:gap-12 items-center">

        <div className="flex w-full flex-col items-center gap-2 lg:w-auto">
          <div
            onClick={() => inputRef.current?.click()}
            className="flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border sm:size-28"
          >
            {preview ? (
              <Image
                src={preview}
                alt="avatar"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </div>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={onSelect}
          />

          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloudIcon className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            disabled={isRemoving || !preview}
            onClick={handleRemoveAvatar}
            className="text-destructive"
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={data?.firstName ?? ''}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={data?.lastName ?? ''}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile"
              defaultValue={data?.mobile ?? ''}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}