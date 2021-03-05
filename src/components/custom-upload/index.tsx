import React, { FC } from 'react'
import styles from './custom-upload.module.scss'


type Props = {
    onFileChange?: any;
    [otherProps: string]: any
}

const CustomUpload: FC<Props> = ({
    onFileChange,
    ...otherProps
}) => {
    return (
        <div className={styles.customUpload}>
            <input onChange={onFileChange} id={otherProps.id && otherProps.id} {...otherProps} />
            <label htmlFor={otherProps.id && otherProps.id}>Choose file</label>
        </div>
    )
}

export default CustomUpload
