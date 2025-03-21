import React from 'react'
import useDisplayCheck from '../useDisplayCheck'

interface JFCustomProps {
  field: {
    identifier: string
    visible?: boolean
    classes?: {
      wrapper?: string
    }
    children?: React.ReactNode
  }
  customComponents: Record<string, React.ReactNode>
}

const JFCustom: React.FC<JFCustomProps> = ({ field, customComponents }: any) => {
  const { identifier, children = <></>, classes = {} } = field
  const display = useDisplayCheck(field?.visible)

  return (
    <>
      {display ? (
        <div className={`${classes.wrapper}`}>
          {customComponents[identifier] ? <>{customComponents[identifier]}</> : <>{children}</>}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default JFCustom
