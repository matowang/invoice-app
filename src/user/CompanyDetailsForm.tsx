import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { z } from "zod";

const CompanyDetailsSchema = z.object({
    name: z.string().min(3, "Company name must contain more than 3 characters.").max(16, "Company name can't contain more than 16 characters."),
    address: z.string().min(1, "This field is required"),
    vatNumber: z.string().min(1, "This field is required"),
    regNumber: z.string().min(1, "This field is required"),
    iban: z.string().optional(),
    swift: z.string().optional(),
});

export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;

interface CompanyDetailsFormProps {
    disabled: boolean;
    formError: string | null;
    onSubmit: (data: CompanyDetails) => unknown;
    defaultCompanyValues?: CompanyDetails;
}

const CompanyDetailsForm = ({ disabled, onSubmit, defaultCompanyValues, formError }: CompanyDetailsFormProps) => {
    const { register, handleSubmit: handleFormHookSubmit, formState: { errors } } = useForm<CompanyDetails>({
        resolver: zodResolver(CompanyDetailsSchema)
    });

    const handleSubmit = async (data: CompanyDetails) => {
        if (disabled) return;
        await onSubmit(data);
    }

    return (
        <>
            <h1>Enter Company Details</h1>
            {formError && <p className='text-red-400' data-test='form-error'>{formError}</p>}
            <form onSubmit={handleFormHookSubmit(handleSubmit)} className="flex flex-col gap-5">
                <TextField {...register("name")}
                    label="Company Name"
                    defaultValue={defaultCompanyValues?.name}
                    placeholder="Toptal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={disabled} />
                <TextField {...register("address")}
                    label="Company Address"
                    defaultValue={defaultCompanyValues?.address}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    disabled={disabled} />
                <TextField {...register("vatNumber")}
                    label="VAT Number"
                    defaultValue={defaultCompanyValues?.vatNumber}
                    placeholder="123456789"
                    error={!!errors.vatNumber}
                    helperText={errors.vatNumber?.message}
                    disabled={disabled} />
                <TextField {...register("regNumber")}
                    label="Registration number"
                    defaultValue={defaultCompanyValues?.regNumber}
                    placeholder="OC123456"
                    error={!!errors.regNumber}
                    helperText={errors.regNumber?.message}
                    disabled={disabled} />
                <TextField {...register("iban")}
                    label="International Bank Account Number (IBAN)"
                    defaultValue={defaultCompanyValues?.iban}
                    placeholder="AL472121100900000002356987411"
                    error={!!errors.iban}
                    helperText={errors.iban?.message}
                    disabled={disabled} />
                <TextField {...register("swift")}
                    label="SWIFT code"
                    defaultValue={defaultCompanyValues?.swift}
                    placeholder="BOFAUS3N"
                    error={!!errors.swift}
                    helperText={errors.swift?.message}
                    disabled={disabled} />
                <Button type="submit" variant='contained' disabled={disabled}>Submit</Button>
            </form>
        </>
    )
}

export default CompanyDetailsForm;