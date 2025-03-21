import { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import { toast } from 'sonner'
import Axios from '@/libs/axios'
import { getReferralURL, updateReferralBonusURL } from '@/services/APIs/admin'
import { useMount } from 'react-use'

export default function ReferalBonus() {
  const [field, setField] = useState({
    paymentPerReferral: '',
  })

  console.log('field', field)

  const handleChange = (e) => {
    setField({
      ...field,
      paymentPerReferral: e.target.value
    })
  }

  useMount(async () => {
    try {
      const { data } = await Axios({ ...getReferralURL })
      setField({
        ...field,
        paymentPerReferral: data?.data?.amount || 0
      })
    } catch (error) {
      console.error(error)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await Axios({ ...updateReferralBonusURL, data: { amount: Number(field.paymentPerReferral || 0) } })
      setField({
        ...field,
        paymentPerReferral: data?.data?.amount || 0
      })
      toast.success('Referral bonus updated successfully')
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <TextInput
          {...field}
          label='Payment per referral'
          placeholder='Enter payment per referral'
          name='paymentPerReferral'
          value={field?.paymentPerReferral}
          onChange={handleChange}
          required
        />
        <div className='mt-4'>
          <CustomButton title='Save Changes' type='submit' />
        </div>
      </form>
    </div>
  )
}

