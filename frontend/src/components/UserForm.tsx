import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Checkbox, FormControlLabel, TextField,} from "@mui/material";

const userSchema = z.object({
    id: z.number().min(1),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email"),
    age: z.string().regex(/^\d+$/, "Age must be a number"),
    isActive: z.boolean(),
    roles: z.array(z.string()).min(1, "At least one role is required"),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
    defaultValues?: UserFormValues;
    onSubmit: (data: UserFormValues) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
                                                      defaultValues,
                                                      onSubmit,
                                                  }) => {
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: {errors},
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{display: "flex", flexDirection: "column", gap: 2, width: 400}}
        >
            <TextField
                label="ID"
                type="number"
                {...register("id", {valueAsNumber: true})}
                error={!!errors.id}
                helperText={errors.id?.message}
                disabled
            />

            <TextField
                label="Username"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled
            />

            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled
            />

            <TextField
                label="Age"
                {...register("age")}
                error={!!errors.age}
                helperText={errors.age?.message}
                disabled
            />

            <FormControlLabel
                control={
                    <Controller
                        name="isActive"
                        control={control}
                        render={({field}) => (
                            <Checkbox
                                {...field}
                                checked={field.value}
                                disabled
                            />
                        )}
                    />
                }
                label="Active user"
            />

            <TextField
                label="Roles (comma separated)"
                {...register("roles")}
                error={!!errors.roles}
                helperText={errors.roles?.message}
                disabled
            />


            <Button type="submit" variant="contained" disabled>
                Save
            </Button>
        </Box>
    );
};
