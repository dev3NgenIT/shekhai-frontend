import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function QuestionSection({
  questionNumber,
  question,
  options,
  selectedOptions,
  onOptionSelect,
}) {
  return (
    <div className="mb-4">
      <Accordion type="multiple" defaultValue={[`item-${questionNumber}`]}>
        <AccordionItem
          value={`item-${questionNumber}`}
          className="rounded-lg border border-b border-border"
        >
          <AccordionTrigger className="border-b bg-card p-4 hover:no-underline data-[state=open]:rounded-b-none">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-sm font-bold text-background">
                {questionNumber}
              </div>
              <span className="text-left font-medium text-foreground">
                {question}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="rounded-b border-b border-border bg-card p-6">
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center gap-2 transition-colors hover:text-primary"
                >
                  <input
                    type="checkbox"
                    name={`question-${questionNumber}`}
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={(e) =>
                      onOptionSelect(questionNumber, option, e.target.checked)
                    }
                    className="size-4 border-2 border-muted-foreground text-primary focus:ring-primary has-checked:bg-base"
                  />
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
