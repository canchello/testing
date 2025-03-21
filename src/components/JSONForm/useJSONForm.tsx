import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'

// import JSONForm from "components/JSONForm";

import { getDefaultFormValue } from './utils/common'
import { createJSONFormValidationSchema } from './utils/validations'
import { AnyObjectSchema } from 'yup'
import JSONForm from '.'

/*
## Props
    {
        formSchema: array,
        customComponents:{
            [string]: node,
        },
        defaultValue: object,
        validationSchema: Yup validation schema,
    }
 */

export default function useJSONForm(props: any) {
  const [formSchema, setFormSchema] = useState(props.formSchema)
  const [customComponentsList, setCustomComponentsList] = useState(props.customComponents ?? {})
  const initialValue = getDefaultFormValue(formSchema, props.defaultValue)

  useEffect(() => {
    setFormSchema(props.formSchema)
  }, [props.formSchema])

  const validationSchema = props.validationSchema
    ? props.validationSchema
    : createJSONFormValidationSchema(formSchema, initialValue)

  const formContext = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema as AnyObjectSchema)
  })

  const { reset } = formContext

  const Form: any = useMemo(() => {
    return (props: any) => {
      const { formContext, initialValue, formSchema, customComponents = {}, isEdit } = Form.customProps
      return (
        <FormProvider {...formContext}>
          <JSONForm
            formSchema={formSchema}
            initialValue={initialValue}
            onSubmit={props.onSubmit}
            showReset={props.showReset}
            onReset={props.onReset}
            customFormActions={props.customFormActions}
            submitButtonText={props.submitButtonText}
            customComponents={customComponents}
            isEdit={isEdit}
          />
        </FormProvider>
      )
    }
  }, [])

  Form.customProps = {
    formContext,
    initialValue,
    formSchema,
    customComponents: customComponentsList,
    isEdit: props.isEdit
  }

  const setCustomComponent = useCallback((id: any, comp: any) => {
    setCustomComponentsList((prev: any) => ({ ...prev, [id]: comp }))
  }, [])

  const setDefaultFormValue = useCallback(
    (defaultValue: any) => {
      reset(getDefaultFormValue(formSchema, defaultValue))
    },
    [formSchema, reset]
  )

  return {
    Form,
    formContext,
    setCustomComponent,
    setDefaultFormValue
  }
}

useJSONForm.propTypes = {
  formSchema: PropTypes.array,
  customComponents: PropTypes.any,
  defaultValue: PropTypes.object,
  validationSchema: PropTypes.any
}
