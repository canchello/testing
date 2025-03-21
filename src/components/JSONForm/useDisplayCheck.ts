import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

// Type for allowed comparator operators
type Comparator = '===' | '!==' | 'includes' | 'hasValue' | 'hasNoValue'

// Type for each condition in fieldDisplay array
type FieldCondition = [string, Comparator, any]

// Type for the fieldDisplay prop
type FieldDisplayType = boolean | FieldCondition[]

const hasValue = (a: any) => (Array.isArray(a) ? !!a.length : typeof a === 'object' ? !!Object.keys(a).length : !!a)

const COMPARATORS: Record<Comparator, (a: any, b?: any) => boolean> = {
  '===': (a, b) => a === b,
  '!==': (a, b) => a !== b,
  includes: (a, b) => Array.isArray(a) && a.includes(b),
  hasValue: a => hasValue(a),
  hasNoValue: a => !hasValue(a)
}

export default function useDisplayCheck(fieldDisplay: FieldDisplayType) {
  // Initial state based on whether fieldDisplay is a boolean
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(typeof fieldDisplay === 'boolean' ? fieldDisplay : true)

  const { control } = useFormContext()

  // Extract field names for useWatch
  const fieldNames = Array.isArray(fieldDisplay) ? fieldDisplay.map(cond => cond[0]) : []

  const watchers = useWatch({
    control,
    name: fieldNames
  })

  useEffect(() => {
    if (Array.isArray(fieldDisplay) && watchers.length === fieldDisplay.length) {
      let bool = true

      fieldDisplay.forEach(([field, comparator, compareValue], index) => {
        if (COMPARATORS[comparator]) {
          bool = bool && COMPARATORS[comparator](watchers[index], compareValue)
        }
      })

      setShouldDisplay(bool)
    }
  }, [fieldDisplay, watchers])

  return shouldDisplay
}
