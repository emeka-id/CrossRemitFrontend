import { Button } from 'components'
import React, { FC, useRef } from 'react'

interface Function {
    (selectedFile: React.ChangeEvent<HTMLInputElement>): void;
}
type Props = {
    onFileChange: Function;
    label?: string;
    [otherProps: string]: any
}

const CustomUpload: FC<Props> = ({
    label,
    onFileChange,
    ...otherProps
}) => {

    const inputFile = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input {...otherProps} ref={inputFile}  hidden onChange={(file) => onFileChange(file)} />
            <Button type="button" onClick={() => inputFile?.current?.click()}>{label}</Button>
        </div>
    )
}

export default CustomUpload

