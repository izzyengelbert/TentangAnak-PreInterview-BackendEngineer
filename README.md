# Tentang Anak Pre Interview Backend Engineer
This project is created for Tentang Anak Pre Interview for Backend Engineer
Tech stack used:
-- Node js
-- Express
-- PostgreSQL
To run docker postgreSQL: 
```
cd postgres-docker-compose
docker-compose up -d 
```
To import postman collection, use this file:
``
Tentang Anak Pre Interview.postman_collection.json
``

To run migration
```
npx sequelize-cli db:migrate
```

To run all seed
```
npx sequelize-cli db:seed:all
```

to run in dev
```
npm run start:dev
```

# Database Entities
## User
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| role_id | bigint | FK |
| username | varchar | |
| password | varchar | |
| username | varchar | |
| created_at | date | |
| updated_at | date | |

## Role
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| name | varchar  | |
| description | varchar  | |
| created_at | date | |
| updated_at | date | |

## Permission
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| name | varchar  | |
| created_at | date | |
| updated_at | date | |

## Monster
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| name | varchar | |
| file_path | varchar  | |
| file_id | varchar  | |
| class | varchar  | ENUM('Diving Monster', 'Flying Monster', 'Insect Monster', 'Fire Monster', 'Water Monster', 'Electric Monster', 'Psychic Monster', 'Grass Monster')|
| description | text  | |
| size | float  | |
| weight | float  | |
| hp | integer  | |
| attack | integer  | |
| defense | integer  | |
| speed | integer  | |
| created_at | date | |
| updated_at | date | |

## Type
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| name | varchar | |
| created_at | date | |
| updated_at | date | |

## Monster Types
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| monster_id | bigint | FK |
| type_id | bigint  | FK |
| created_at | varchar | |
| updated_at | varchar | |

## User Monsters
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| user_id | bigint | FK |
| monster_id | bigint  | FK |
| created_at | varchar | |
| updated_at | varchar | |

## Policy Access Control
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| route | varchar | |
| http_method | varchar | |
| enabled | boolean | |
| created_at | varchar | |
| updated_at | varchar | |

## Policy Access Control Permissions
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| policy_access_control_id | bigint | FK |
| permission_id | bigint  | FK |
| created_at | varchar | |
| updated_at | varchar | |

## File
| property | type | constraints |
| ------ | ------ | ------ |
| id | bigint | |
| buffer | varchar | |
| filename | varchar  | |
| mimetype | varchar  | |
| created_at | varchar | |
| updated_at | varchar | |

# Pre defined data
## Roles and Permissions
These are predefined roles in the seed:
-- Admin
-- User
These are predefined permissions in the seed:
-- create_monster
-- read_monster
-- update_monster
-- delete_monster
-- catch_monster
-- read_user
-- update_user
-- delete_user
Admin role will have all permissions
User role will have these permissions:
-- catch_monster
-- read_user
-- update_user
-- delete_user

## Policy Access Controls
| HTTP method | route | enabled | permissions required
| ------ | ------ | ------ | ------ |
| GET | "/monsters/" | false | read_monster |
| GET | "/monsters/:id" | false | read_monster |
| POST | "/monsters/" | true | create_monster |
| PUT | "/monsters/:id" | true | update_monster |
| PUT | "/monsters/:id/catch" | true | catch_monster |
| DELETE | "/monsters/:id" | true | delete_monster |
| GET | "/files/" | false |  |
| GET | "/files/:id" | false |  |
| GET | "/users/" | true | read_user |
| GET | "/users/:id" | true | read_user |

