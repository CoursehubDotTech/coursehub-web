import * as clerk from '@clerk/nextjs/server';
import Courses from "../../pages/Course";

export default async function Home() {
  const user = await clerk.currentUser();
  const userObj = user ? {
    fullName: user.fullName || '',
  } : null;

  return (
    <Courses userObj={userObj}/>
  );
}
