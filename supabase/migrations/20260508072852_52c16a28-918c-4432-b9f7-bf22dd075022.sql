CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit a contact message
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 100
  AND length(trim(email)) BETWEEN 3 AND 255
  AND length(trim(message)) BETWEEN 10 AND 2000
);

-- No SELECT policy = nobody can read via the API (admins can view in dashboard)
