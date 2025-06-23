import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";

const GET_VMS = gql`
query {
    vms {
      domain {
        name
        state
      }
    }
  }
`;



function Vm() {
    const [online, setOnline] = useState(null);

    const { loading, error, data } = useQuery(GET_VMS, {
        onData: ({ data }) => {
          console.log(" Neue Daten:", data.array);
        }
      });
    if (loading) return <p>Lade VMs...</p>;
    if (error) return <p>Fehler: {error.message}</p>;

    
    const redPoint= <div className="w-4 h-4 rounded-full bg-red-500 inline-block"></div>;
    const greenPoint = <div className="w-4 h-4 rounded-full bg-green-500 inline-block"></div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {data.vms.domain.map((vm, index) => (
                <div key={vm.uuid} className="bg-gray-700 text-white p-4 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-2">{vm.name}</h2>
                    <p>Status: {vm.state}  {vm.state =="RUNNING"? greenPoint: redPoint}</p>
                    <p>UUID: {vm.uuid}</p>
                </div>
            ))}
        </div>
    );
}

export default Vm;
