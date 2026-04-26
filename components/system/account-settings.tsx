import { Separator } from '@/components/ui/separator'

import PersonalInfo from '@/components/system/personal-info'
import EmailPass from '@/components/system/email-password'
import ConnectAccount from '@/components/system/connect-account'
import DangerZone from '@/components/system/danger-zone'

const UserGeneral = () => {
  return (
    <section className='py-3'>
      <div className='mx-auto max-w-7xl'>
        <PersonalInfo />
        <Separator className='my-10' />
        <EmailPass />
        <Separator className='my-10' />
        <ConnectAccount />
        <Separator className='my-10' />
        <DangerZone />
      </div>
    </section>
  )
}

export default UserGeneral
