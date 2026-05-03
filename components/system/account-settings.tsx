import { Separator } from '@/components/ui/separator'

import PersonalInfo from '@/components/system/personal-info'
import EmailPass from '@/components/system/email-password'

const UserGeneral = () => {
  return (
    <section className='py-3'>
      <div className='mx-auto max-w-7xl'>
        <PersonalInfo />
        <Separator className='my-10' />
        <EmailPass />
      </div>
    </section>
  )
}

export default UserGeneral
