# How

1. I installed a stack based on my article about about Nextjs and TS and then remove everything to start from a clear Slate.

2. Face with issue how should I query GraphQL api? Especially if I want to do some kind of subscription. setInterval should do that trick but what about GraphQL client? I've never work with Nextjs and GraphQL in one stack before. I heard good comments about React Query when working with graphql instead of apollo client. Installing React query. Planning to go through the tutorial on youtube.

3. Decided to go with React Query. Installed it and all other dependencies: graphql, graphql-request, graphql-tag and devtools

4. Decided to create queries first and then a hook for fetching data
5. Add env variables to store API variable and add to .gitignore
6. Okay, how to refetch it with react query? invalidateQueries in interval
7. Before Pagination we need to implement at least one column. Problem with 100% height :(
8. Pagination
