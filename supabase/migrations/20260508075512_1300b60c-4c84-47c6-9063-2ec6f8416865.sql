CREATE TABLE public.submission_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES public.contact_submissions(id) ON DELETE CASCADE,
  admin_user_id UUID NOT NULL,
  body TEXT NOT NULL CHECK (length(trim(body)) >= 1 AND length(trim(body)) <= 5000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_submission_replies_submission_id ON public.submission_replies(submission_id);

ALTER TABLE public.submission_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view replies"
  ON public.submission_replies FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert replies"
  ON public.submission_replies FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = admin_user_id);

CREATE POLICY "Admins can delete replies"
  ON public.submission_replies FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));