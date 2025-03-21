import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Axios from '@/libs/axios'
import Loader from './Loader'
import { cn } from '@/libs/tailwind'

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
  columns: Column[] | any
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
  recordPerPage?: any
  className?: string
}

const TableComponent: React.FC<TableComponentProps> = ({
  customTableClasses = '',
  customHeaderClasses = '',
  className = '',
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
  onRowClick = () => {}, // Default empty function
  recordPerPage = 10
}) => {
  // State variables
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [paginator, setPaginator] = useState<any>()
  const [renderData, setRenderData] = useState<any[]>([])
  const [sortConfig, setSortConfig] = useState(payloadObj?.sortConfig)
  // || { sort: columns[0]?.dataKey, order: 1 }
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(isDataLoading)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const searchColumns = useMemo(() => payloadObj?.search?.columns || [], [payloadObj?.search?.columns])
  const extraFilters = useMemo(
    () => (payloadObj?.additionalFilters ? payloadObj?.additionalFilters : {}),
    [payloadObj?.additionalFilters]
  )
  const extraOptionFilters = useMemo(
    () => (payloadObj?.optionFilters ? payloadObj?.optionFilters : {}),
    [payloadObj?.optionFilters]
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
        sort: {
          [sortConfig?.sort]: sortConfig?.order // Dynamic key for sorting
        },
        ...extraOptionFilters
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
    const newDirection = sortConfig?.sort === dataKey && sortConfig?.order === 1 ? -1 : 1 // 1 is ASC, -1 is DESC
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
    if (!Object.keys(dataURL).length && data.length > 0) {
      setTotalPages(Math.ceil(data.length / recordPerPage))
      setRenderData(data.slice(0, recordPerPage))
    }
  }, [data, dataURL])

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage, currentPage + 1, '...', totalPages]
  }

  return (
    <div className={cn('', className)}>
      {loading ? (
        <div className='text-center'>
          <Loader />
        </div>
      ) : !!renderData?.length ? (
        <div className='overflow-x-auto'>
          <table className={`w-full text-left border-collapse ${customTableClasses}`}>
            <thead className='bg-[#F1F1F1] text-sm font-medium'>
              <tr>
                {selectableRows && <th className='px-4 py-4 rounded-tl-xl rounded-bl-xl'>Select</th>}
                {columns.map((col: any, index: number) => (
                  <th
                    key={index}
                    className={`px-4 py-4 text-left ${col.sortable ? 'cursor-pointer' : ''} ${
                      !selectableRows && index === 0
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
                  {columns.map((col: any, colIndex: number) => (
                    <td key={colIndex} className='py-4 px-3'>
                      {col.cell ? col.cell(row) : row[col.dataKey]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center text-gray-500 my-4'>No data found</div>
      )}

      {enablePagination && (
        <div className='flex justify-between items-center bg-[#F1F1F1] px-2 py-2 rounded-md my-1'>
          <div>
            {paginator?.itemCount > recordPerPage
              ? `Showing 1-${renderData.length} of ${paginator?.itemCount ?? '-'} Records`
              : `Showing 1-${renderData.length} Records`}
          </div>
          <div>
            {/* <ul className='flex items-center gap-2'>
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
            </ul> */}
            <ul className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md'>
              {/* Previous Button */}
              {currentPage > 1 && (
                <li
                  className='cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200'
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </li>
              )}

              {/* Page Numbers */}
              {getPageNumbers().map((page: any, index) =>
                page === '...' ? (
                  <li key={index} className='px-3 py-1'>
                    ...
                  </li>
                ) : (
                  <li
                    key={index}
                    className={`px-3 py-1 rounded-md cursor-pointer ${
                      currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </li>
                )
              )}

              {/* Next Button */}
              {currentPage < totalPages && (
                <li
                  className='cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200'
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableComponent
