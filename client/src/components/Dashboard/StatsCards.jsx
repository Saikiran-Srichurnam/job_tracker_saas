import React from "react";

function StatsCards({jobsData}) {
  // const [jobsData, setJobsData] = useState({});

  // useEffect(() => {
  //   const fetchJobsStats = async () => {
  //     try {
  //       const jobs = await getJobStats();
  //       console.log(jobs);
  //       setJobsData(jobs.data);
  //     } catch (error) {
  //       console.log(error);
  //       return error.message;
  //     }
  //   };

  //   fetchJobsStats();
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
      <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
        <p className="text-gray-300">Applications</p>
        <h3 className="text-4xl font-bold mt-2">
          {jobsData?.totalJobsCount || 0}
        </h3>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
        <p className="text-gray-300">Interviews</p>
        <h3 className="text-4xl font-bold mt-2">
          {jobsData?.interviewJobsCount || 0}
        </h3>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
        <p className="text-gray-300">Offers</p>
        <h3 className="text-4xl font-bold mt-2">
          {jobsData?.offerJobsCount || 0}
        </h3>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
        <p className="text-gray-300">Rejected</p>
        <h3 className="text-4xl font-bold mt-2">
          {jobsData?.rejectedJobsCount || 0}
        </h3>
      </div>
    </div>
  );
}

export default StatsCards;
