import { MongoClient } from "mongodb";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse react meetups online"></meta>
      </Head>
      <MeetupList key={props.meetups._id} meetups={props.meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://maxmezwin:pLss7ln32mW661Iy@kekich.spsig5b.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        ...meetup,
        _id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
