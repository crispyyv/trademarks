export interface IClassification {
  id: string;
  text: string;
  text_en: string;
}

export interface ITrademark {
  application_date: string;
  classifications: string;
  exp_date: string;
  holder: string;
  holder_country: string;
  id: number;
  image: string;
  origin: string;
  registration_date: string;
  source: string;
  status: string;
  title: string;
  image_url: string;
  image_path: string;
  trademark_number: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string | null;
}
