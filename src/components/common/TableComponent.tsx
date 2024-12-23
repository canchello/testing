import React, { useState, useEffect, useId, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Axios from '@/libs/axios'
import Loader from './Loader'

interface Column {
  name: string
  dataKey: string
  sortable?: boolean
  selector?: (row: any) => any
  cell?: (row: any) => any
}

interface TableComponentProps {
  customTableClasses?: string
  customHeaderClasses?: string
  columns: Column[]
  data?: any[]
  dataURL?: any
  tableTitle?: string
  enablePagination?: boolean
  enableFilters?: boolean
  enableSearch?: boolean
  isDataLoading?: boolean
  refetchData?: boolean
  setRefetchData?: (value: boolean) => void
  payloadObj?: any
  selectableRows?: boolean
  onSelectedRowsChange?: (selectedRows: any[]) => void
  rowClickable?: boolean // New prop for enabling row clicks
  onRowClick?: (row: any) => void // New prop for handling row clicks
}

const TableComponent: React.FC<TableComponentProps> = ({
  customTableClasses = '',
  customHeaderClasses = '',
  columns = [],
  data = [],
  dataURL = {},
  tableTitle,
  enablePagination = false,
  enableFilters = false,
  enableSearch = false,
  isDataLoading = false,
  refetchData = false,
  setRefetchData = () => {},
  payloadObj = {},
  selectableRows = false,
  onSelectedRowsChange = () => {},
  rowClickable = false, // Default value
  onRowClick = () => {} // Default empty function
}) => {
  const id = useId()
  const recordPerPage = 3

  // State variables
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [paginator, setPaginator] = useState<any>()
  const [renderData, setRenderData] = useState<any[]>([])
  const [sortConfig, setSortConfig] = useState(payloadObj?.sortConfig || { sort: columns[0]?.dataKey, order: 'ASC' })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(isDataLoading)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const searchColumns = useMemo(() => payloadObj?.search?.columns || [], [payloadObj?.search?.columns])
  const extraFilters = useMemo(
    () => (payloadObj?.additionalFilters ? payloadObj?.additionalFilters : {}),
    [payloadObj?.additionalFilters]
  )

  const APIpayload = useMemo(
    () => ({
      query: {
        ...extraFilters
      },
      options: {
        limit: recordPerPage,
        page: currentPage,
        pagination: enablePagination,
        ...sortConfig
      }
    }),
    [currentPage, extraFilters, searchColumns, searchTerm, sortConfig]
  )

  const fetchDataFromAPI = useCallback(async () => {
    if (!dataURL) return
    setLoading(true)
    try {
      const { data }: any = await Axios({ ...dataURL, data: { ...APIpayload } })
      if (data) {
        setRenderData(data.data.data)
        setTotalPages(data.data.paginator.pageCount)
        setPaginator(data.data.paginator)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [APIpayload, dataURL])

  const updateRenderData = useCallback(
    (page: number) => {
      const pageStart = (page - 1) * recordPerPage
      const pageEnd = page * recordPerPage
      setRenderData(data.slice(pageStart, pageEnd))
    },
    [data]
  )

  const handlePageChange = (page: number) => {
    if (currentPage === page) return
    setCurrentPage(page)

    if (dataURL) {
      setRefetchData(true)
    } else {
      updateRenderData(page)
    }
  }

  const handleSearchChange = useCallback(
    (value: string) => {
      const searchText = value.toLowerCase()
      setCurrentPage(1)
      if (dataURL) {
        setRefetchData(true)
      } else {
        setSearchTerm(searchText)
        const filteredData = data.filter(rowData => JSON.stringify(rowData).toLowerCase().includes(searchText.trim()))
        setTotalPages(Math.ceil(filteredData.length / recordPerPage))
        setRenderData(filteredData.slice(0, recordPerPage))
      }
    },
    [data, dataURL, setRefetchData]
  )

  const handleSort = (dataKey: any) => {
    const newDirection = sortConfig?.sort === dataKey && sortConfig?.order === 'ASC' ? 'DESC' : 'ASC'
    setSortConfig({ sort: dataKey, order: newDirection })
    if (dataURL) {
      setRefetchData(true)
    }
  }

  const toggleRowSelection = (row: any) => {
    const isSelected = selectedRows.includes(row)
    const updatedSelectedRows = isSelected
      ? selectedRows.filter(selectedRow => selectedRow !== row)
      : [...selectedRows, row]

    setSelectedRows(updatedSelectedRows)
    onSelectedRowsChange(updatedSelectedRows)
  }

  useEffect(() => {
    if (dataURL && refetchData) {
      fetchDataFromAPI()
      setRefetchData(false)
    }
  }, [dataURL, fetchDataFromAPI, refetchData])

  useEffect(() => {
    if (!dataURL) {
      handleSearchChange(searchTerm)
      return
    }
    const interval = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(interval)
  }, [dataURL, searchTerm])

  useEffect(() => {
    if (!dataURL && data.length > 0) {
      setTotalPages(Math.ceil(data.length / recordPerPage))
      setRenderData(data.slice(0, recordPerPage))
    }
  }, [data, dataURL])

  return (
    <div className='bg-white shadow-lg rounded-lg p-4'>
      {loading ? (
        <div className='text-center'>
          <Loader />
        </div>
      ) : renderData.length > 0 ? (
        <table className={`w-full text-left border-collapse ${customTableClasses}`}>
          <thead className='bg-[#F1F1F1] text-sm font-medium'>
            <tr>
              {selectableRows && <th className='px-4 py-4'>Select</th>}
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-4 text-left ${col.sortable ? 'cursor-pointer' : ''} ${
                    index === 0
                      ? 'rounded-tl-xl rounded-bl-xl'
                      : index === columns.length - 1
                      ? 'rounded-tr-xl rounded-br-xl'
                      : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.dataKey)}
                >
                  {col.name}
                  {col.sortable && (
                    <span className='ml-2'>
                      {sortConfig?.sort === col.dataKey ? (
                        sortConfig?.order === 'ASC' ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )
                      ) : null}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderData.map((row, index) => (
              <tr
                key={index}
                className={`text-sm ${index % 2 === 0 ? 'bg-gray-50' : ''} ${
                  rowClickable ? 'cursor-pointer hover:bg-gray-200' : ''
                }`}
                onClick={() => rowClickable && onRowClick(row)} // Handle row click
              >
                {selectableRows && (
                  <td className='py-4 px-3'>
                    <input
                      type='checkbox'
                      onClick={e => e.stopPropagation()} // Prevent row click
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRowSelection(row)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className='py-4 px-3'>
                    {col.cell ? col.cell(row) : row[col.dataKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-center text-gray-500'>No data found</div>
      )}

      {enablePagination && (
        <div className='flex justify-between items-center bg-[#F1F1F1] px-2 py-2 rounded-md my-1'>
          <div>
            Showing 1-{recordPerPage} from {paginator?.itemCount ?? '-'} data
          </div>
          <div>
            <ul className='flex items-center gap-2'>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={` px-3 rounded-md cursor-pointer ${
                    currentPage === index + 1 ? 'bg-custom-orange ' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableComponent
