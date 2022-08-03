---
layout: "../../layouts/BlogPost.astro"
title: "Replicate MongoDB to PostgreSQL in real time"
description: "The creation of a CLI tool to replicate MongoDB to PostgreSQL in real time"
publishDate: "2022-08-01"
tags: [mongodb, postgresql, replication, realtime, backup, typescript]
image:
  src: "/assets/posts/mopo/images/icon.svg"
  alt: "ICON"
  height: "50px"
setup: |
  import GithubLink from "../../components/md/GithubLink.astro"
---

<GithubLink url="https://github.com/rebellionpay/mopo" name="Open source"/>

# Why would you want to replicate a database?

Sometimes there is some different reasons: improve permforance and reliability on distributed systems, to make a backup...

On this case we ([RebellionPay](https://rebellionpay.com)) were using [PowerBI](https://powerbi.microsoft.com/) to analyze and visualize our business data.

The tricky part was to feed PowerBI with the data from our MongoDB database and it doesn't have a way to do that. So we decided that a PostgreSQL database would be the [Data Warehouse](https://en.wikipedia.org/wiki/Data_warehouse) for our business data.

That is why we decided to create a CLI tool to replicate MongoDB to PostgreSQL.

# But why in real time?

This type of work (replication) is done in nightly jobs, data was that big that it would take a long time to replicate. We needed to do it in real time. Listen to changes on MongoDB and replicate them to the PostgreSQL database.

# Configuration

The user needs to provide the following configuration:
- MongoDB connection
- PostgreSQL connection
- MongoDB collection models
- Sync options: watchOperations

You could listen to a multiple operations on a collection: 
```ts
enum MongoOperation {
    INSERT = 'insert',
    REPLACE = 'replace',
    UPDATE = 'update',
    DELETE = 'delete',
    RENAME = 'rename',
    DROP = 'drop',
    DROP_DATABASE = 'dropDatabase',
    INVALIDATE = 'invalidate',
}
```

## Example configuration

```json:.mopo.json
{
  "mongo": {
    "connection": {
      "uri": "mongodb+srv://USER:PASS@URL/database?retryWrites=true&w=majority",
      "options": {
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
        "auto_reconnect": true
      }
    },
    "collectionModels": {
      "users": {
        "_id": {
          "type": "TEXT",
          "primary": true
        },
        "email": {
          "type": "TEXT"
        },
        "phone": {
          "type": "TEXT"
        },
        "phone_country": {
          "type": "TEXT"
        },
        "lang": {
          "type": "TEXT"
        },
        "name": {
          "type": "TEXT"
        },
        "createdAt": {
          "type": "TIMESTAMP"
        },
        "updatedAt": {
          "type": "TIMESTAMP"
        }
      },
      "postgres": {
        "connection": {
          "config": {
            "host": "psql.example.com",
            "database": "database",
            "user": "postgres",
            "password": "****************************"
          }
        }
      },
      "sync": [
        {
          "collection": "users",
          "watchOperations": ["INSERT", "UPDATE"]
        }
      ]
    }
  }
}
```

**You can specify also if a column is primary or unique as shown.**

As you can see, the configuration is pretty simple. We are going to sync all the `INSERT` and `UPDATE` operations on the `users` collection.

Every INSERT on MongoDB is parsed and inserted on PostgreSQL. It happens the same way for UPDATE.

# Running the tool

#### Setup the tool:
```bash
git clone https://github.com/rebellionpay/mopo mopo && cd mopo
npm i
npm run build
```

#### Listen and sync only users collection:
```bash
dist/index.js --start .mopo.json --listen-only users --log-level verbose --strict-listen
```

# Visit the github repository

<GithubLink url="https://github.com/rebellionpay/mopo" name="Open source"/>