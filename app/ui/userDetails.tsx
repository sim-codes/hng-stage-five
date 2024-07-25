import { getAuth } from 'firebase-admin/auth';
import { db, auth, app } from "@/app/firebase/config";

export default function UserDetails({ user_id }: { user_id: string }) {
    async function getUserById(userId: string) {
        try {
            await getAuth(app)
                .getUser(userId)
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                    return userRecord.toJSON();
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const user = getUserById(user_id);

    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {user_id}</p>
        </div>
    )
}