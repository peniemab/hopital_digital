import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const ID_UNIQUE = ID;

export const APPWRITE_CONFIG = {
    dbId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    colLeads: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    colServices: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SERVICES_ID!,
};