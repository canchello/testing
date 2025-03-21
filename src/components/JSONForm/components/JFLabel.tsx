import CustomFieldLabel from '../CustomComponents/FormComponents/FieldLabel'
import { checkIfFieldIsRequired } from '../utils/common'

interface JFLabelProps {
  field: any
  customComponents?: any
}

const JFLabel: React.FC<JFLabelProps> = ({ field, customComponents = {} }) => {
  const { name, label, classes, fieldProps } = field

  return (
    <CustomFieldLabel
      name={name}
      label={label}
      className={classes?.label}
      fieldProps={fieldProps}
      isRequired={checkIfFieldIsRequired(field)}
      customComponents={customComponents}
    />
  )
}

export default JFLabel
