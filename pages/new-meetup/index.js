import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";

const NewMeetup = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.push("/");
  }
  return (
    <>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </>
  );
};
export default NewMeetup;
