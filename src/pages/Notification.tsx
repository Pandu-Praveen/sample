import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Notification() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Details</PageHeaderHeading>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>1</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
