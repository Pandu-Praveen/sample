import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Empty() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>System Page</PageHeaderHeading>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>System 1</CardTitle>
          <CardDescription>Description.</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
