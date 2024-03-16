import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createSelectedQuestion } from '@/server-lib/actions';

export async function CreateQuestionCardForm({
  presentationId,
}: {
  presentationId: string;
}) {
  return (
    <Card className="bg-white shadow-md">
      <form action={createSelectedQuestion}>
        <input type="hidden" name="presentationId" value={presentationId} />
        <div className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Új kérdés</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Textarea
              className="box-border h-full min-h-[6rem]"
              name="content"
              required
              placeholder="Kérezz bármit"
            />
          </CardContent>
          <CardFooter className="flex min-h-fit flex-col items-stretch justify-between space-y-4 md:flex-row md:space-y-0">
            <Button className="h-11" variant="outline">
              Törlés
            </Button>
            <Button className="h-11" type="submit">
              Elküldés
            </Button>
          </CardFooter>
        </div>
      </form>
    </Card>
  );
}
