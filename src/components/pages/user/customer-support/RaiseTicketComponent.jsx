'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/common/CustomButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomTextArea from '@/components/form/TextareaInput';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '@/components/form/LabelInput';
import CustomSelect from '@/components/form/SelectField';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/libs/constants';
import { createRaiseTicketURL, deletRaiseTicketURL, updateRaiseTicketURL } from '@/services/APIs/customerSupport';
import Axios from '@/libs/axios';
import { toast } from 'sonner';
import dayjs from 'dayjs';

export default function RaiseTicketComponent({
  ticketDetails = {},
  mode = 'add', // Can be "add" or "edit"
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      issueType: '',
      issueSubject: '',
      issueDescription: '',
    },
  });

  const onCancelClick = () => {
    router.push(ROUTES.CUSTOMER_SUPPORT);
  };

  const createRaiseTicket = async (data) => {
    try {
      setLoading(true)
      const { data: res } = await Axios({ ...createRaiseTicketURL, data: data })
      if (res) {
        toast.success('Issue Raised Successfully!')
        router.push(ROUTES.CUSTOMER_SUPPORT)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRaisedTicket = async (data) => {
    try {
      setLoading(true)
      const { data: res } = await Axios({ ...updateRaiseTicketURL(ticketDetails._id), data: data })
      if (res) {
        toast.success('Issue Updated Successfully!')
        router.push(ROUTES.CUSTOMER_SUPPORT)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRaiseTicket = async () => {
    try {
      const response = await Axios({ ...deletRaiseTicketURL(ticketDetails._id) })
      toast.success("Issue deleted successfully!")
      onCancelClick();
    } catch (error) {
      console.log('error', error)
    }
  }

  const onSubmit = (data) => {
    if (mode === "add") {
      createRaiseTicket(data)
    }
    else if (mode === "edit") {
      updateRaisedTicket(data)
    }
    // Handle submission logic
  };

  useEffect(() => {
    if (mode === 'edit' && ticketDetails) {
      reset({
        issueType: ticketDetails?.issueType || '',
        issueSubject: ticketDetails?.issueSubject || '',
        issueDescription: ticketDetails?.issueDescription || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, ticketDetails]);

  const markAsOpen = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...updateRaiseTicketURL(ticketDetails._id), data: { status: "open" } })
      toast.success("Issue marked as open successfully!")
      onCancelClick();
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-10 space-y-4">
      <div className="flex items-center gap-6">
        <CustomButton
          title="Back"
          variant="default"
          ImageIcon={false}
          icon={
            <div className="rounded-full bg-primary p-2 h-8 w-8">
              <FontAwesomeIcon icon={faChevronLeft} color="white" />
            </div>
          }
          className="!p-0"
          iconPosition="left"
          onClick={onCancelClick}
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{ticketDetails.issueSubject || 'Raise an Issue'}</h1>
        {mode === 'edit' && (
          <div className="text-gray-600 flex flex-col sm:flex-row justify-between items-start gap-2">
            <p>
              <strong>Issue Registered On: </strong>
              {ticketDetails?.createdAt ? dayjs(new Date(ticketDetails?.createdAt)).format("MM-DD-YYYY") : 'N/A'}
            </p>
            {ticketDetails?.resolvedOn &&
              <p>
                <strong>Issue Resolved On: </strong>
                {ticketDetails?.resolvedOn}
              </p>}
            <span
              className={`px-4 py-2 capitalize rounded-full text-sm font-medium ${ticketDetails?.status === 'closed' ? 'bg-[#0FA35C] text-[#FFFFFF]' : 'bg-yellow-200 text-yellow-800'
                }`}
            >
              {ticketDetails?.status}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="issueType"
            control={control}
            rules={{ required: 'Issue Type is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label="Issue Type"
                options={[
                  { label: 'Car', value: 'car' },
                  { label: 'Hotel', value: 'hotel' },
                ]}
                error={errors.issueType?.message}
                required
                disabled={mode === 'edit' && ticketDetails.status === 'closed'} // Only disable in "edit" mode if status is "closed"
              />
            )}
          />

          <Controller
            name="issueSubject"
            control={control}
            rules={{
              required: 'Subject is required',
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Subject"
                placeholder="Enter Issue Subject"
                error={errors.issueSubject?.message}
                required
                isDisabled={mode === 'edit' && ticketDetails.status === 'closed'} // Only disable in "edit" mode if status is "closed"
              />
            )}
          />
        </div>

        <Controller
          name="issueDescription"
          control={control}
          rules={{
            required: 'Description is required',
          }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label="Issue Description"
              placeholder="Tell us more about the issue you are facing..."
              error={errors.issueDescription?.message}
              required
              isDisabled={mode === 'edit' && ticketDetails.status === 'closed'} // Only disable in "edit" mode if status is "closed"
            />
          )}
        />
        {ticketDetails.status === 'closed' && (
          <div>
            <label className="text-medium font-bold text-gray-700">Resolution <span className='text-red-400'>*</span></label>
            <p className="mb-3 font-semibold text-gray-700">
              A confirmation mail has been sent to the registered E-mail id. Please check your inbox and let us know if you have any issue.
            </p>
            <p className="font-semibold text-gray-700">
              Thanks & Regards
            </p>
            <p className='font-semibold text-gray-700'>
              Libutel Team.
            </p>
          </div>
        )}

        <div className="flex gap-4">
          {mode === 'edit' ? (
            <>
              {ticketDetails?.status === "close" ?
                <CustomButton title="Open Issue" variant="primary" isLoading={loading} onClick={markAsOpen} />
                :
                <CustomButton title="Update Issue" variant="primary" type="submit" isLoading={loading} />
              }
              <CustomButton title="Delete Issue" variant="danger" onClick={deleteRaiseTicket} isLoading={loading} />
            </>
          ) : (
            <>
              <CustomButton type="submit" title="Raise Issue" variant="primary" className="mt-6" isLoading={loading} />
              <CustomButton type="button" onClick={onCancelClick} title="Cancel" variant="default" className="mt-6" />
            </>
          )}
        </div>
      </form>
    </div>
  );
}
