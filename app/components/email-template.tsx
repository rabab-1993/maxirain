import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Tailwind
} from "@react-email/components";


type Props = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export default function ContactEmail({
  name,
  email,
  phone,
  message
}: Props) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-slate-100 font-sans p-10">
          
          <Container className="bg-white rounded-lg border border-slate-200 max-w-xl mx-auto overflow-hidden">
            
            <Section className="bg-slate-900 px-6 py-4">
              <Heading className="text-white text-lg m-0">
                Maxirain Contact Form
              </Heading>
            </Section>

            <Section className="p-6 space-y-4">
              
              <Text className="text-slate-600">
                You received a new message from the website contact form.
              </Text>

              <Section className="space-y-2">

                <Text>
                  <strong>Name:</strong> {name}
                </Text>

                <Text>
                  <strong>Email:</strong> {email}
                </Text>

                <Text>
                  <strong>Phone:</strong> {phone || "N/A"}
                </Text>

              </Section>

              <Section className="bg-slate-100 p-4 rounded-md">
                <Text className="font-semibold mb-2">Message</Text>
                <Text>{message}</Text>
              </Section>

            </Section>

            <Section className="bg-slate-50 text-center text-xs text-slate-500 py-4">
              © {new Date().getFullYear()} Maxirain
            </Section>

          </Container>

        </Body>
      </Tailwind>
    </Html>
  );
}