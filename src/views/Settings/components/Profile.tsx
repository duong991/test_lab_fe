import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import cloneDeep from 'lodash/cloneDeep'
import { useState } from 'react'
import { apiUpdateUserDetails } from '@/services/UserService'
import appConfig from '@/configs/app.config'
import { setAvatar } from '@/store'

export type ProfileFormModel = {
    email: string
    avatar: any
    description: string
    dob: string
}

type ProfileProps = {
    data?: ProfileFormModel
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    description: Yup.string()
        .min(3, 'Too Short!')
        .max(128, 'Too Long!')
        .required('Description Required'),
    dob: Yup.date().required('Date of Birth Required'),
})

const Profile = ({
    data = {
        email: '',
        description: '',
        avatar: '',
        dob: '',
    },
}: ProfileProps) => {
    const [avatarFile, setAvatarFile] = useState<File | null>()
    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
        setAvatarFile(file[0])
    }

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const onFormSubmit = async (
        values: ProfileFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const response = await apiUpdateUserDetails({
            ...values,
            avatar: avatarFile,
        })

        if (response?.data?.avatar) {
            toast.push(
                <Notification title={'Profile updated'} type="success" />,
                {
                    placement: 'top-center',
                }
            )
            dispatch(setAvatar(response.data.avatar))
        } else {
            toast.push(
                <Notification title={'Profile updated'} type="success" />,
                {
                    placement: 'top-center',
                }
            )
        }
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            // validationSchema={validationSchema}r
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                onFormSubmit(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription title="General" desc="" />

                            <FormRow
                                name="email"
                                label="Email"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    disabled={true}
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = field.value
                                            ? {
                                                  src: field.value.startsWith(
                                                      'blob' ||
                                                          'http' ||
                                                          'https'
                                                  )
                                                      ? field.value
                                                      : appConfig.apiPrefix +
                                                        '/upload/' +
                                                        field.value,
                                              }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                beforeUpload={beforeUpload}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="description"
                                label="Description"
                                {...validatorProps}
                            >
                                <Field
                                    type="textarea"
                                    asElement="textarea"
                                    autoComplete="off"
                                    name="description"
                                    placeholder=""
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="dob"
                                label="Date of Birth"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="date"
                                    autoComplete="off"
                                    name="dob"
                                    component={Input}
                                    prefix={
                                        <LiaBirthdayCakeSolid className="text-xl" />
                                    }
                                />
                            </FormRow>

                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={() => resetForm()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
function dispatch(arg0: { payload: string; type: 'auth/user/setAvatar' }) {
    throw new Error('Function not implemented.')
}
