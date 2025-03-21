'use client'
import { useEffect, useMemo, useState } from 'react'
import Coupons from './Coupons'
import CouponDetails from './CouponDetails'
import NoCoupons from './NoCoupons'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import appStore from '@/stores/appStore'
import { useDebounce, useMount } from 'react-use'
import Axios from '@/libs/axios'
import { couponListURL, deleteCouponURL } from '@/services/APIs/admin'
import Loader from '@/components/common/Loader'
import { getHotelListURL, getRoomTypeListURL } from '@/services/APIs/hotel'
// import SearchInput from "components/SearchInput";

export default function CouponList() {
  const { couponData, setCouponData } = appStore()
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [formOptions, setFormOptions] = useState({
    roomsOptions: [],
    PropertyOptions: [],
  })
  const [coupons, setCoupons] = useState(couponsTest)

  useDebounce(() => {
    setNewSearch(search)
  }, 500, [search])

  const { activeCoupons, inActiveCoupons } = useMemo(() => {
    return {
      activeCoupons: coupons.filter((i) => i.status === "active"),
      inActiveCoupons: coupons.filter((i) => i.status === "inactive")
    }
  }, [coupons])

  const getCouponList = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...couponListURL, data: {
          query: {
            search: newSearch ? newSearch : undefined,
            searchColumns: ["title", "code"]
          }
        }
      })
      setCoupons(data.data?.data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCouponList()
  }, [newSearch])

  const onDeleteCoupon = async (id) => {
    try {
      setFormLoading(true)
      await Axios({ ...deleteCouponURL(id) })
      getCouponList()
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  }

  if (formLoading) return <Loader className='my-8' />
  if (couponData)
    return (
      <div className=''>
        <CouponDetails couponData={couponData} options={formOptions} refetch={getCouponList} />
      </div>
    )

  return (
    <div className='h-full'>
      {(!!coupons.length || newSearch) ? (
        <div className='container h-full'>
          <div>
            <PageHeader
              title='Coupons'
              content='Create and manage your discount coupons to boost sales and attract
              more customers. Easily track the performance of each coupon and
              adjust your offers to maximize impact.'
            />
          </div>
          <div className='flex justify-between items-center'>
            <TextInput placeholder='Search by Campaign...' value={search} onChange={e => setSearch(e.target.value)} />
            <CustomButton title="Add new Coupon" className='rounded-md' onClick={() => setCouponData({})} />
          </div>
          {loading ? <Loader />
            : <>
              <div className='mt-4'>
                <Coupons active={true} list={activeCoupons} {...{ onDeleteCoupon }} />
              </div>
              <div>
                <Coupons list={inActiveCoupons} {...{ onDeleteCoupon }} />
              </div>
            </>}
        </div>
      ) : (
        <NoCoupons onAddNew={() => setCouponData({})} />
      )}
    </div>
  )
}

export function PageHeader({ title = '', content = '' }) {
  return (
    <div className='mb-6'>
      <h4 className='text-xl font-semibold mb-3'>{title}</h4>
      <h6 className='text-base font-normal'>{content}</h6>
    </div>
  )
}

const couponsTest = [
  {
    discount: '30%',
    couponCode: 'INDDAY2024',
    variant: 'red',
    title: 'INDEPENDENCE DAY SALE 2024',
    subtitle: 'Min Order Amount : Rs. 2,000',
    isActive: true
  },
  {
    discount: '30%',
    couponCode: 'INDDAY2024',
    variant: 'green',
    title: 'INDEPENDENCE DAY SALE 2024',
    subtitle: 'Min Order Amount : Rs. 2,000',
    isActive: true
  },
  {
    discount: '30%',
    couponCode: 'INDDAY2024',
    variant: 'yellow',
    title: 'INDEPENDENCE DAY SALE 2024',
    subtitle: 'Min Order Amount : Rs. 2,000',
    isActive: true
  },
  {
    discount: '30%',
    couponCode: 'INDDAY2024',
    variant: 'yellow',
    title: 'INDEPENDENCE DAY SALE 2024',
    subtitle: 'Min Order Amount : Rs. 2,000',
    isActive: false
  }
]
