export const environment ={
  supabaseConfig:{
    url:'https://sbxihfifqidrdzrbrwsm.supabase.co',
    secret:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNieGloZmlmcWlkcmR6cmJyd3NtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzU4MjE3NiwiZXhwIjoyMDQzMTU4MTc2fQ.bTdDyrJIK0WzjfmWAu2DYYA0WFImr6En6YrwSTXiGRA'
  }
}

const db_copy = {
  "users": [
    {
      "id": "1d222ca2-503b-42b7-b4ea-21348cd19cfb",
      "userName": "luigi777",
      "password": "Luigi11111",
      "photo": "aircnc/user/f7758e81-21a7-4ca9-87c4-28c3418ca924",
      "bio": "ganadora .",
      "email": "lnieves108@soyudemedellin.edu.co",
      "owner": false
    },
    {
      "id": "677ff994-ae2e-490b-a6d9-1db042d9b422",
      "userName": "luigi778",
      "password": "luigi11111",
      "photo": "/assets/luigi.png",
      "bio": "vacia",
      "email": "lnieves108@soyudemedellin.edu.co",
      "owner": true
    },
    {
      "id": "8f59ff28-da20-4119-a38b-4229e3f9c9dd",
      "userName": "luigi779",
      "password": "luigi11111",
      "photo": "/assets/luigi.png",
      "bio": "vacia",
      "email": "luiginieves0@gmail.com",
      "owner": true
    },
    {
      "id": "9ab41c52-a3b9-49e5-8633-59814eb5ad78",
      "userName": "luigi780",
      "password": "luigi11111",
      "photo": "aircnc/user/d6be21ae-0390-4566-9461-af5ab54a2815",
      "bio": "vacia",
      "email": "luiginieves0@gmail.com",
      "owner": true,
      "idPhoto": "d6be21ae-0390-4566-9461-af5ab54a2815"
    },
    {
      "id": "8c20d544-2d99-4ab1-ae31-646ce30d381d",
      "userName": "luigi180",
      "password": "luigi11111",
      "idPhoto": "983b2318-714f-4a3f-897f-b572db7d4e4f",
      "bio": "vacia",
      "email": "luiginieves0@gmail.com",
      "owner": true,
      "photo": "aircnc/user/983b2318-714f-4a3f-897f-b572db7d4e4f"
    },
    {
      "id": "c7d9ac19-c231-4404-beb7-ca8e4c794c39",
      "userName": "juanpa1234",
      "password": "Juanpa1234",
      "idPhoto": "770e9bfd-0f9b-4f8f-b4b6-06ffd49aab0d",
      "bio": "vacia",
      "email": "juanpa@gmail.com",
      "owner": true,
      "photo": "aircnc/user/770e9bfd-0f9b-4f8f-b4b6-06ffd49aab0d"
    }
  ],
  "properties": [
    {
      "title": "canarias22",
      "description": "dfdfd",
      "price": 1231,
      "location": "fdfdfdf",
      "imageUrl": "aircnc/properties/019cafb7-a954-4751-aab2-8e1700437fe0",
      "ownerId": "677ff994-ae2e-490b-a6d9-1db042d9b422",
      "id": "019cafb7-a954-4751-aab2-8e1700437fe0",
      "categories": ["APTO", "PISCINA"]
    },
    {
      "title": "canarias22",
      "description": "dfdfd",
      "price": 1231,
      "location": "fdfdfdf",
      "imageUrl": "aircnc/properties/39ae8aee-37bc-4ee7-af31-4130b79b8803",
      "ownerId": "677ff994-ae2e-490b-a6d9-1db042d9b422",
      "id": "39ae8aee-37bc-4ee7-af31-4130b79b8803",
      "categories": ["CASA", "PLAYA"]
    },
    {
      "title": "medellin",
      "description": "para mañana",
      "price": 800000,
      "location": "ciudadi perdida",
      "imageUrl": "aircnc/properties/72566f2e-ed4b-4ead-99bd-af1bbb3791b5",
      "ownerId": "677ff994-ae2e-490b-a6d9-1db042d9b422",
      "id": "72566f2e-ed4b-4ead-99bd-af1bbb3791b5",
      "categories": ["APTO", "DOMO", "PISCINA"]
    },
    {
      "title": "bogota",
      "description": "para la proxima",
      "price": 1200000,
      "location": "ciudadi perdida",
      "imageUrl": "aircnc/properties/4adffe27-ee4c-4e8d-a46c-a0f276086a33",
      "ownerId": "8f59ff28-da20-4119-a38b-4229e3f9c9dd",
      "id": "4adffe27-ee4c-4e8d-a46c-a0f276086a33",
      "categories": ["ISLA", "POPULARES"]
    },
    {
      "title": "alameda",
      "description": "puede ser",
      "price": 3000000,
      "location": "riohacha",
      "imageUrl": "aircnc/properties/82c34ec8-6cc4-4a4f-84ad-44db093d424e",
      "ownerId": "9ab41c52-a3b9-49e5-8633-59814eb5ad78",
      "id": "82c34ec8-6cc4-4a4f-84ad-44db093d424e",
      "categories": ["CASA", "PISCINA", "PLAYA"]
    },
    {
      "title": "MEdde",
      "description": "pa siempre",
      "price": 30888,
      "location": "riohacha",
      "imageUrl": "aircnc/properties/c08ad513-16cf-4843-ae3f-80724cc487e5",
      "ownerId": "9ab41c52-a3b9-49e5-8633-59814eb5ad78",
      "id": "c08ad513-16cf-4843-ae3f-80724cc487e5",
      "categories": ["DOMO", "POPULARES"]
    },
    {
      "title": "Casa campo",
      "description": "ES una casa muy bonita",
      "price": 280000,
      "location": "Cancun",
      "imageUrl": "aircnc/properties/ee336db9-e123-41e3-90a3-02c4c41e2ec8",
      "ownerId": "c7d9ac19-c231-4404-beb7-ca8e4c794c39",
      "id": "ee336db9-e123-41e3-90a3-02c4c41e2ec8",
      "categories": ["CASA", "PLAYA", "POPULARES"]
    }
  ]
}
