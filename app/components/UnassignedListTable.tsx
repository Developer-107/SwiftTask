"use client";

import { Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios from "axios";
import { Parcel, User } from "../../types/globalTypes";
import TableBodySkeleton from "./TableBodySkeleton";
import Dropdown from "./DropDown";

export default function UnassignedListTable() {
  const [loading, setLoading] = useState(true);
  const [unassignedParcels, setUnassignedParcels] = useState<Parcel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Record<number, number>>(
    {},
  );

  useEffect(() => {
    const fetchUnassignedParcels = async () => {
      try {
        setLoading(true);
        const resParcels = await axios.get("/api/parcels");
        const resUsers = await axios.get("/api/users");
        setUnassignedParcels(resParcels.data);
        setUsers(resUsers.data);
      } catch (err) {
        console.error("Error fetching parcels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnassignedParcels();
  }, []);

  const handleAssign = async (parcelId: number) => {
    const userId = selectedUsers[parcelId];

    if (!userId) return alert("Select user first");

    try {
      await axios.patch(`/api/parcel/assign/${parcelId}`, {
        userId,
      });

      setUnassignedParcels((prev) => prev.filter((p) => p.id !== parcelId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
    <Table.Root className="border border-gray-300 rounded-xl w-200">
      <Table.Header>
        <Table.Row className="text-xs">
          <Table.ColumnHeaderCell>Parcel Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Tracking Number</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      {loading ? (
        <TableBodySkeleton />
      ) : (
        <Table.Body className="text-xs">
          {unassignedParcels.map((unassignedParcel) => (
            <Table.Row key={unassignedParcel?.id}>
              <Table.RowHeaderCell className="font-medium!">{unassignedParcel?.id}</Table.RowHeaderCell>
              <Table.Cell>{unassignedParcel?.trackingNumber}</Table.Cell>
              <Table.Cell>
                {new Date(unassignedParcel.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {unassignedParcel.updatedAt
                  ? new Date(unassignedParcel.updatedAt).toLocaleDateString()
                  : "-"}
              </Table.Cell>
              <Table.Cell className="flex gap-4 items-center overflow-visible">
                <Dropdown
                  users={users}
                  value={selectedUsers[unassignedParcel.id]}
                  onChange={(userId) =>
                    setSelectedUsers((prev) => ({
                      ...prev,
                      [unassignedParcel.id]: userId,
                    }))
                  }
                />

                <button
                  onClick={() => handleAssign(unassignedParcel.id)}
                  className="flex items-center justify-center h-6 p-2 font-medium text-[#002761] border border-[#002761] hover:bg-[#002761] hover:text-white text-xs rounded cursor-pointer"
                >
                  Assign
                </button>
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      )}
    </Table.Root>
     </div>
  );
}
