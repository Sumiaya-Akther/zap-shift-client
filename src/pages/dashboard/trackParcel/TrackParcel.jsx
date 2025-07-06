import React from 'react';

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchTrackingLogs = async (trackingId) => {
  const res = await axios.get(`http://localhost:5000/tracking/${trackingId}`);
  return res.data;
};

const TrackParcel = () => {

      const [trackingId, setTrackingId] = useState("");
  const [searchId, setSearchId] = useState("");

  const {
    data: logs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tracking", searchId],
    queryFn: () => fetchTrackingLogs(searchId),
    enabled: !!searchId,
    retry: false,
  });

  const handleSearch = () => {
    setSearchId(trackingId);
  };
    return (
     <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Parcel Tracking</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Track
        </button>
      </div>

      {isLoading && <p className="text-blue-500">Loading tracking info...</p>}
      {isError && <p className="text-red-500">{error.message}</p>}
      {!isLoading && logs.length === 0 && searchId && !isError && (
        <p className="text-yellow-500">No tracking history found.</p>
      )}

      <ul className="timeline timeline-vertical">
        {logs.map((log, i) => (
          <li key={i}>
            <div className="timeline-start">{new Date(log.time).toLocaleString()}</div>
            <div className={`timeline-middle ${log.status === "Delivered" ? "bg-green-500" : "bg-blue-500"}`}></div>
            <div className="timeline-end mb-10">
              <div className="p-4 bg-base-200 rounded-box">
                <h3 className="font-bold">{log.status}</h3>
                <p>{log.message}</p>
                <small className="text-gray-500">Updated by: {log.updated_by || "System"}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    );
};

export default TrackParcel;