FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json /.
RUN ls -l
RUN npm install
COPY frontend .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]


#docker build -t madhukummari/react-front:latest . | docker build .
#                                                  | docker tag <image-id> madhukummari/react-front:latest
#docker run -it <image-id>

# Delete a Specific Image: Once you have the image ID or name, you can delete it with:
#     docker rmi <image_name_or_id>
#     docker rmi <image_id_1> <image_id_2> <image_id_3>

# Force Deleting an Image: If the image is currently being used by a container (either running or stopped), you will need to forcefully remove it:
#     docker rmi -f <image_name_or_id>

# Delete All Unused Images (Dangling Images): If you want to remove all unused images (dangling images), run:

#     docker image prune -a

# List Stopped Containers: To view a list of all stopped containers, use:

#     docker ps -a
# Remove a Specific Stopped Container: You can remove a specific stopped container by specifying its container ID or name:

#     docker rm <container_name_or_id>
# Remove All Stopped Containers: To remove all stopped containers at once, you can run:

#         docker container prune

# Remove All Stopped Containers Without Confirmation: If you want to remove all stopped containers without being prompted for confirmation, use the -f flag:

#     docker rm -f $(docker ps -a -q)