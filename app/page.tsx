import * as clerk from '@clerk/nextjs/server';
import Homepage from "./pages/Home";

export default async function Home() {
  const user = await clerk.currentUser();
  const userObj = user ? {
    fullName: user.fullName || '',
    emailAddresses: user.emailAddresses || [],
    primaryEmailAddress: user.primaryEmailAddress || '',
    totpEnabled: user.totpEnabled || false,
  } : null;

  return (
    <Homepage userObj={userObj}/>
  );
}
