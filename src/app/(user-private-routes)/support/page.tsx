'use client'
import CustomButton from '@/components/common/CustomButton'
import { faChevronDown, faChevronLeft, faEnvelope, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import imageSrc from '@/assets/images/IdelImage.png'
import Table from '@/components/common/TableComponent'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/libs/constants'
import { useEffect, useState } from 'react'
import { deletRaiseTicketURL, getRaiseTicketsListURL } from '@/services/APIs/customerSupport'
import { toast } from 'sonner'
import Axios from '@/libs/axios'
import dayjs from 'dayjs'
import Link from 'next/link'
interface Issue {
  date: string
  type: string
  description: string
  comment: string
  resolutionDate?: string
  status: string
}

export default function CustomerSupport() {
  // const [myBookings, setMyBookings] = useState([])
  const router = useRouter()

  const [refetchData, setRefetchData] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const columns = [
    {
      name: 'Date',
      dataKey: 'createdAt',
      sortable: true,
      cell: (row: any) => <div>{row?.createdAt ? dayjs(new Date(row?.createdAt)).format('YYYY-MM-DD') : '-'}</div>
    },
    {
      name: 'Issue Type',
      dataKey: 'issueType',
      sortable: true
    },
    {
      name: 'Issue Description',
      dataKey: 'issueDescription'
    },
    {
      name: 'Comment',
      dataKey: 'comment'
    },
    {
      name: 'Resolution Date',
      dataKey: 'resolutionDate',
      sortable: true
    },
    {
      name: 'Status',
      dataKey: 'status',
      sortable: true
    }
  ]

  // const staticData: Issue[] = [
  // 	{
  // 		date: "12-07-2024",
  // 		type: "Hotel",
  // 		description: "Can’t cancel the booking for Triopli hotel",
  // 		comment: "-",
  // 		status: "Work In Progress",
  // 	},
  // 	{
  // 		date: "01-07-2024",
  // 		type: "Car",
  // 		description: "I want to update my Car Booking",
  // 		comment: "-",
  // 		status: "Work In Progress",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Not able to do card payment",
  // 		comment:
  // 			"Update your card details in the profile section and you’ll be able to do the card payments",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Didn’t receive the confirmation mail for my booking",
  // 		comment: "A confirmation mail has been sent to the registered E-mail id",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Didn’t receive the confirmation mail for my booking",
  // 		comment: "A confirmation mail has been sent to the registered E-mail id",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Didn’t receive the confirmation mail for my booking",
  // 		comment: "A confirmation mail has been sent to the registered E-mail id",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Didn’t receive the confirmation mail for my booking",
  // 		comment: "A confirmation mail has been sent to the registered E-mail id",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // 	{
  // 		date: "28-05-2024",
  // 		type: "Hotel",
  // 		description: "Didn’t receive the confirmation mail for my booking",
  // 		comment: "A confirmation mail has been sent to the registered E-mail id",
  // 		resolutionDate: "12-07-2024",
  // 		status: "Closed",
  // 	},
  // ];

  const handleCreateRaiseTicketClick = () => {
    router.push(ROUTES.CREATE_RAISE_TICKET)
  }

  const handleDeleteIssue = async () => {
    if (selectedRows.length === 0) {
      toast.info('Please select at least one issue to delete.')
      return
    }
    try {
      await Promise.all(
        selectedRows.map(async row => {
          await Axios({ ...deletRaiseTicketURL(row._id) }) // Assuming each row has an 'id' property
        })
      )
      // After successful deletion, refetch data to update the table
      setRefetchData(true) // You can trigger the refetch here
      setSelectedRows([])
      toast.success('Selected issues deleted successfully!')
    } catch (error) {
      console.log('error', error)
    }
  }
  const rowClickHandler = (data: any) => {
    if (data?._id) {
      router.push(`/support/ticket/${data._id}`)
    }
  }
  const handleSelectedRowChange = (row: any) => {
    setSelectedRows(row)
  }
  useEffect(() => {
    setRefetchData(true)
  }, [])

  return (
    <div className='p-4 md:p-10 space-y-4'>
      <div className='flex justify-between gap-6'>
        <Link href={'/'}>
          <CustomButton
            title='Back to Home'
            variant='default'
            ImageIcon={false}
            icon={
              <div className='rounded-full bg-primary p-2 h-8 w-8'>
                <FontAwesomeIcon icon={faChevronLeft} color='white' />
              </div>
            }
            className='!p-0'
            iconPosition='left'
          />
        </Link>
      </div>
      <div className='flex flex-col md:flex-row justify-between bg-custom-dark-blue rounded-xl min-h-96'>
        <div className='flex flex-col justify-center items-start space-y-6 text-white max-w-[680px] p-8'>
          <h1 className='text-2xl font-bold'>{"Need Assistance? We're Here To Help!"}</h1>
          <p className='text-lg'>
            {"Have a question or need assistance? We're here to help! You can reach us through:"}
          </p>
          <div className='flex flex-col sm:flex-row gap-6'>
            <div className='flex items-start flex-col space-y-2'>
              <div className='rounded-full bg-primary flex items-center justify-center h-10 w-10'>
                <FontAwesomeIcon icon={faEnvelope} color='white' />
              </div>
              <p>info@libutel.com</p>
            </div>
            <div className='flex items-start flex-col space-y-2'>
              <div className='rounded-full bg-primary flex items-center justify-center h-10 w-10'>
                <FontAwesomeIcon icon={faPhone} color='white' />
              </div>
              <p>+91-9003199000</p>
            </div>
          </div>
        </div>
        <div className='flex items-end mx-8'>
          <Image src={imageSrc} alt='' />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-4 w-full'>
        <div className='w-full'>
          <div className='py-4 flex flex-wrap justify-between items-center w-full'>
            <div>
              <h1 className='text-xl font-semibold text-gray-700'>All Unsolved Issues</h1>
              <span className='text-gray-500'>5 tickets</span>
            </div>
            <div className='flex ml-auto items-center gap-4'>
              <CustomButton onClick={() => handleCreateRaiseTicketClick()} title='Raise a New Issue' />
            </div>
          </div>
          <div className='mx-auto flex flex-wrap gap-4 justify-between items-center'>
            <div className='flex w-[250px] border px-4 py-2 rounded-3xl justify-between items-center'>
              <p className='m-0 p-0 text-md font-semibold text-[#808080]'>Sort By</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className='flex items-center ml-auto'>
              <CustomButton
                variant='default'
                className='text-red-500'
                onClick={handleDeleteIssue}
                title='Delete Issue'
                iconPosition='left'
                ImageIcon={false}
                icon={<FontAwesomeIcon icon={faTrash} />}
              />
            </div>
          </div>
          <main className='mx-auto py-8'>
            <div className=' rounded-lg'>
              <Table
                dataURL={getRaiseTicketsListURL}
                refetchData={refetchData}
                enablePagination={true}
                setRefetchData={setRefetchData}
                columns={columns}
                selectableRows={true}
                rowClickable={true}
                onRowClick={rowClickHandler}
                onSelectedRowsChange={handleSelectedRowChange}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
