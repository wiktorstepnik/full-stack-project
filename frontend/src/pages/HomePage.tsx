import {Box, CircularProgress, List, ListItem, ListItemButton, ListItemText,} from "@mui/material";
import type {User} from "../interfaces/user.ts";
import {useUser, useUsers} from "../hooks/useUsersHooks.ts";
import {useState} from "react";
import {UserForm} from "../components/UserForm.tsx";

const HomePage = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const {
        data: users,
        isLoading: usersLoading,
        error: usersError,
    } = useUsers();

    const {
        data: user,
        isLoading: userLoading,
    } = useUser(selectedUserId);

    if (usersLoading) {
        return <div>Loading users...</div>;
    }

    if (usersError) {
        return <div>Error during users loading</div>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                height: "100vh",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: "25%",
                    borderRight: "1px solid #ddd",
                    overflowY: "auto",
                    padding: 5
                }}
            >
                <List>
                    {users?.map((user: User) => (
                        <ListItem key={user.id} disablePadding>
                            <ListItemButton onClick={() => setSelectedUserId(user.id)}>
                                <ListItemText
                                    primary={user.username}
                                    secondary={
                                        Array.isArray(user.roles)
                                            ? user.roles.join(", ")
                                            : user.roles
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box
                sx={{
                    width: "75%",
                    overflowY: "auto",
                    padding: 5,
                }}
            >
                {userLoading && <CircularProgress/>}
                {!userLoading && user && (
                    <UserForm
                        defaultValues={user}
                        onSubmit={() => console.log("Form Submitted")}
                    />
                )}
                {!userLoading && !user && (
                    <Box sx={{p: 2, color: "text.secondary"}}>
                        Select a user to see details
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
