import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Center } from "@/components/common/Center";
import { Spinner } from "@/components/common/Spinner";
import { Pagination, Table } from "@mantine/core";
import { dateToReadable, roundToDecimal, secsToReadable } from "../../utils";
import { User } from "@prisma/client";

interface IApiTestResult extends TestResult {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface TestResponse {
  meta: {
    count: number;
    page: number;
    perPage: number;
  };
  data: IApiTestResult[];
}

interface Props {
  user: User;
}

const fetchTests = async (page: number, id: string): Promise<TestResponse> => {
  const { data } = await axios.get(`/api/users/tests/${id}?page=${page}`);
  return data.tests as TestResponse;
};

export const UserTests: React.FC<Props> = ({ user }) => {
  const [page, setPage] = useState(1);

  const { data: tests, isLoading } = useQuery(["tests", page], () =>
    fetchTests(page, user.id)
  );

  if (isLoading || !tests) {
    return (
      <Center className="h-96">
        <Spinner size={30} />
      </Center>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Your latest tests</h1>

      <Table className="mt-5 w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Time</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tests.data.map((test) => (
            <tr key={test.id}>
              <td>{test.type}</td>
              <td>{secsToReadable(test.time / 1000)}</td>
              <td>{roundToDecimal(test.wpm, 2)}</td>
              <td>{roundToDecimal(test.accuracy, 2)}%</td>
              <td>{dateToReadable(test.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-center">
        <Pagination
          value={page}
          color="indigo"
          onChange={setPage}
          total={Math.ceil(tests.meta.count / tests.meta.perPage)}
        />
      </div>
    </>
  );
};
