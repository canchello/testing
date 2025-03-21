export const couponDetailFormSchema = ({ roomsOptions = [], propertyOptions = [] } = {}) => [
  {
    type: 'custom',
    children: 'Coupon Details',
    classes: { wrapper: 'px-2 w-full font-semibold text-xl pb-2' }
  },
  {
    type: 'field',
    fieldType: 'input',
    name: 'title',
    label: 'Coupon Name',
    isRequired: true,
    fieldProps: {
      placeholder: 'Enter Coupon Name',
      note: '*Do not exceed 20 characters for the name',
      maxLength: 20
    },
    validations: {
      required: ['Coupon Name is required.']
    },
    classes: { wrapper: 'px-2 w-full' }
  },
  // {
  //   type: 'field',
  //   fieldType: 'select',
  //   name: 'brand',
  //   label: 'Brand',
  //   isRequired: true,
  //   fieldProps: {
  //     placeholder: 'Choose Brand',
  //     options: ['House Of Fashion', 'Brand B', 'Brand C']
  //   },
  //   validations: {
  //     required: ['Brand is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full md:w-1/2' }
  // },
  {
    type: 'field',
    fieldType: 'input',
    name: 'code',
    label: 'Coupon Code',
    isRequired: true,
    fieldProps: {
      placeholder: 'Enter Coupon Code'
    },
    validations: {
      required: ['Coupon Code is required.']
    },
    classes: { wrapper: 'px-2 w-full md:w-1/2' }
  },
  {
    type: 'field',
    fieldType: 'textarea',
    name: 'couponDescription',
    label: 'Coupon Description',
    isRequired: true,
    fieldProps: {
      placeholder: 'Enter coupon description',
      caption: '*Do not exceed 200 characters for the description',
      maxLength: 200,
      rows: 5
    },
    validations: {
      required: ['Product description is required.']
    },
    classes: { wrapper: 'px-2 w-full' }
  },
  {
    type: 'custom',
    children: 'Discount Detail',
    classes: { wrapper: 'px-2 w-full font-bold py-2' }
  },
  // Radio Button
  {
    type: 'field',
    fieldType: 'radio',
    name: 'discountType',
    isRequire: true,
    fieldProps: {
      options: [
        { label: 'Percentage Off', value: 'percentage_off' },
        { label: 'Flat Amount Off', value: 'flat_amount_off' }
      ]
    },
    label: 'Coupon Type',
    validations: {
      required: ['Coupon type is required.']
    },
    classes: { wrapper: 'px-2 w-full font-bold py-2' }
  },
  {
    type: 'field',
    fieldType: 'input',
    name: 'discount',
    label: 'Discount',
    isRequired: true,
    fieldProps: {
      placeholder: 'Enter discount',
      type: 'number'
    },
    validations: {
      required: ['Discount is required.']
    },
    classes: { wrapper: 'px-2 w-full md:w-1/2' }
  },
  // {
  //   type: 'field',
  //   fieldType: 'input',
  //   name: 'discountPercentage',
  //   label: 'Maximum Discount Percentage',
  //   isRequired: true,
  //   fieldProps: {
  //     type: 'number',
  //     placeholder: 'Discount Percentage'
  //   },
  //   validations: {
  //     required: ['Discount Percentage is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full md:w-1/2' }
  // },
  // {
  //   type: 'field',
  //   fieldType: 'input',
  //   name: 'minimumAmount',
  //   label: 'Minimum Amount',
  //   isRequired: true,
  //   fieldProps: {
  //     type: 'number',
  //     placeholder: 'Minimum Amount'
  //   },
  //   validations: {
  //     required: ['Minimum Amount is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full md:w-1/2' }
  // },
  {
    type: 'custom',
    children: 'Coupon Validity',
    classes: { wrapper: 'px-2 mt-2 w-full font-bold py-2' }
  },
  {
    type: 'field',
    fieldType: 'date',
    name: 'startDate',
    label: 'Start Date',
    isRequired: true,
    fieldProps: {
      placeholder: 'DD/MM/YYYY',
      type: 'datetime-local'
    },
    validations: {
      required: ['Start Date is required.']
    },
    classes: { wrapper: 'px-2 w-full md:w-1/2 px-2 ' }
  },
  {
    type: 'field',
    fieldType: 'date',
    name: 'endDate',
    label: 'End Date',
    isRequired: true,
    fieldProps: {
      placeholder: 'DD/MM/YYYY',
      type: 'datetime-local'
    },
    validations: {
      required: ['End Date is required.']
    },
    classes: { wrapper: 'px-2 w-full md:w-1/2 px-2' }
  },
  // {
  //   type: 'field',
  //   fieldType: 'time',
  //   name: 'startTime',
  //   label: 'Start Time',
  //   isRequired: true,
  //   fieldProps: {
  //     placeholder: 'HH:MM'
  //   },
  //   validations: {
  //     required: ['Start Time is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full md:w-1/2 px-2 ' }
  // },
  // {
  //   type: 'field',
  //   fieldType: 'time',
  //   name: 'endTime',
  //   label: 'End Time',
  //   isRequired: true,
  //   fieldProps: {
  //     placeholder: 'HH:MM'
  //   },
  //   validations: {
  //     required: ['End Time is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full md:w-1/2 px-2 ' }
  // },

  // {
  // 	type: "custom",
  // 	children: "Shipping Details",
  // 	classes: { wrapper: "px-2 w-full font-bold pb-2" },
  // },
  // {
  //   type: 'field',
  //   fieldType: 'select',
  //   name: 'typeOfRooms',
  //   label: 'Type of Room',
  //   isRequired: true,
  //   fieldProps: {
  //     placeholder: 'Select Room Types',
  //     isMulti: true,
  //     options: roomsOptions
  //   },
  //   validations: {
  //     required: ['Rooms is required.']
  //   },
  //   classes: { wrapper: 'mt-4 px-2 w-full' }
  // },
  // {
  //   type: 'field',
  //   fieldType: 'select',
  //   name: 'property',
  //   label: 'Property',
  //   fieldProps: {
  //     placeholder: 'Select Property',
  //     isMulti: true,
  //     options: propertyOptions
  //   },
  //   validations: {
  //     required: ['Property is required.']
  //   },
  //   classes: { wrapper: 'px-2 w-full' }
  // },
  {
    type: 'custom',
    identifier: 'actionBtn'
  }
]

export const uploadImagesFormSchema = []
