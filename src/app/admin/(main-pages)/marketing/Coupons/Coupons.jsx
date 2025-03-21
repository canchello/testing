import CouponCard from './CouponCard'

function Coupons({ active = false, list = [], onDeleteCoupon }) {
  return (
    <div className='my-5'>
      {/* Title */}
      <h5 className='text-xl font-semibold'>{active ? 'Active Coupons' : 'Inactive Coupons'}</h5>

      {/* Coupon List */}
      <div>
        {list.length > 0 ? (
          list.map((coupon, index) => <CouponCard key={index} data={coupon} {...{ onDeleteCoupon }} />)
        ) : (
          <h6 className='text-lg my-3'>No Coupons available</h6>
        )}
      </div>
    </div>
  )
}

export default Coupons
