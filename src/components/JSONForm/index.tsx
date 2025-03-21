import { Fragment } from 'react'
import { useFormContext, SubmitHandler } from 'react-hook-form'

// import JFSection from './components/JFSection'
// import JFSubSection from './components/JFSubSection'
// import JFFieldArray from './components/JFFieldArray'
// import JFRow from './components/JFRow'
import JFCustom from './components/JFCustom'
// import JFHeader from './components/JFHeader'
import JFField from './components/JFField'
import CustomButton from '../common/CustomButton'

interface JSONFormProps {
  formSchema: Array<any> // Define a more specific type based on your schema structure
  onSubmit?: SubmitHandler<any>
  initialValue?: any
  showReset?: boolean
  onReset?: () => void
  customFormActions?: React.ReactNode
  submitButtonText?: string
  customComponents?: Record<string, any>
  isEdit?: boolean
}

const JSONForm: React.FC<JSONFormProps> = ({
  formSchema,
  onSubmit = data => {
    console.log(data)
  },
  showReset = true,
  onReset = () => {},
  initialValue,
  customFormActions = null,
  submitButtonText = 'Submit',
  customComponents = {},
  isEdit
}) => {
  const {
    reset,
    handleSubmit,
    formState: { defaultValues }
  } = useFormContext()

  const resetFormData = (event: React.FormEvent) => {
    event.stopPropagation()
    reset(defaultValues)
    onReset()
  }

  const onError = (errors: any) => {
    // Handle errors if needed
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} onReset={resetFormData}>
      <div className='flex flex-wrap mb-3'>
        {Array.isArray(formSchema) ? (
          <>
            {formSchema.map((field, index) => {
              field.isEdit = isEdit // You can type this field properly based on your schema
              return (
                <Fragment key={`${field?.type}--${index}`}>
                  {field?.type ? (
                    <>
                      {/* {field.type === 'header' && <JFHeader field={field} />} */}
                      {/* {field.type === 'section' && <JFSection field={field} />}
                      {field.type === 'subSection' && <JFSubSection field={field} />}
                      {field.type === 'divider' && <JFSubSection field={{}} />}
                      {field.type === 'fieldArray' && (
                        <JFFieldArray field={field} customComponents={customComponents} />
                      )} */}
                      {field.type === 'field' && <JFField field={field} />}
                      {/* {field.type === 'row' && <JFRow field={field} customComponents={customComponents} />} */}
                      {field.type === 'custom' && <JFCustom field={field} customComponents={customComponents} />}
                    </>
                  ) : (
                    <>Specify Field Type</>
                  )}
                </Fragment>
              )
            })}
          </>
        ) : (
          <div>Not valid Form Schema</div>
        )}
      </div>

      {customFormActions ? (
        customFormActions
      ) : (
        <div className='flex justify-end gap-2 mt-3'>
          {showReset && <CustomButton type='reset' variant='outlined' className='px-4' title='Reset' />}
          <CustomButton type='submit' className='px-4' title={submitButtonText} />
        </div>
      )}
    </form>
  )
}

export default JSONForm
