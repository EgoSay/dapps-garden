"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface EventListProps {
  contractName: "YourCollectible" | "Staker";
  eventName: "Transfer" | "Stake";
  title: string;
  description?: string;
  columns: {
    header: string;
    accessor: (args: any) => React.ReactNode;
  }[];
}

export const EventList = ({ contractName, eventName, title, description, columns }: EventListProps) => {
  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName,
    eventName,
    fromBlock: 0n,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin">
            <Clock className="h-8 w-8" />
          </div>
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && (<p className="text-sm text-muted-foreground">{description}</p>)}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index} className="font-medium">
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {!events || events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                      No events found
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event, index) => (
                    <TableRow key={index}>
                      {columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>{column.accessor(event.args)}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 