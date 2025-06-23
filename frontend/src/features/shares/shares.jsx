import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";

import React from 'react';

const GET_ARRAY_DATA = gql`
  query {
    array {
      state
      capacity {
        disks {
          free
          used
          total
        }
      }
      disks {
        name
        size
        status
        temp
        id
      }
      caches {
        name
        device
        status
        id
      }
    }
  }
`;
const Shares = () => {
    const { data, loading, error } = useQuery(GET_ARRAY_DATA);


    if (loading) return <p>Lade Daten...</p>;
    if (error) return <p>Fehler: {JSON.stringify(error)}</p>;
    if (!data) return <p>Keine Daten verfügbar</p>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-gray-700 text-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-2">Array</h2>
                <p>Status: {data.array.state}</p>
                <p>Capacity:</p>
                <ul>
                    <li>
                        Free: {data.array.capacity?.disks?.free}, Used: {data.array.capacity?.disks?.used}, Total: {data.array.capacity?.disks?.total}
                    </li>
                </ul>
                <p className="mt-2">Disks:</p>
                <ul>
                    {data.array.disks?.map((disk) => (
                        <li key={disk.id}>
                            {disk.name}: Size: {disk.size}, Status: {disk.status}, Temp: {disk.temp}
                        </li>
                    ))}
                </ul>
                <p className="mt-2">Caches:</p>
                <ul>
                    {data.array.caches?.map((cache) => (
                        <li key={cache.id}>
                            {cache.name}: Device: {cache.device}, Status: {cache.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Shares;