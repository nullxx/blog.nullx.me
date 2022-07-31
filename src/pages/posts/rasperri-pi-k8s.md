---
layout: "../../layouts/BlogPost.astro"
title: "Raspberry pi 4B kubernetes cluster"
description: "Kubernetes cluster for Raspberry pi 4B"
publishDate: "2021-05-06"
tags: [rasperri, raspberry, pi, kubernetes, cluster]
image:
  src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vrami9wji4uxu4rcshzz.png"
  alt: "Cluster of Raspberry Pi 4B"
  height: "180px"
  width: "180px"
---

I love decentralized computing. It’s beautiful. Just add a node to your cluster if you need more power! Just that. Restart the pods with no downtime, horizontal pod autoscaler...

To create a cluster, we can do it with services provided by google, amazon… or just manually installing it in each node.

I prefer to create my own mini cluster. My cluster is made of 6 raspberry pi 4B (4GB RAM each) and has it's own name: **clusperry** ⚡️

<center>
![Cluster preview](https://i.ibb.co/VwftyjW/IMG-6147.jpg)
</center>

I created a simple gui tool to generate the linux images to flash into the mini-SD cards with the initial cloudconfig. You can check it here: https://github.com/nullxx/clusperry-installer.



# Nodes setup
Download the release from https://github.com/nullxx/clusperry-installer/releases/ (its currently only compiled for macOS)



### 1. Select the nodes operating system
![SELECT OS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lslmg3xnh8vftmcw4hy6.gif)



### 2. Configure each node with your configuration:
  - IP
  - WIFI (or ethernet)
  - hostname
  - SSH keys

![CONFIGURE NODES](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vdxxs4jcgdnrkbv0m5k7.gif)



### 3. Download OS images
![Download](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rk0i5zs3k6g4d90ad7on.gif)



### 4. Write images
![Write images](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kdxf1pb32x5ehe0yf4tm.gif)



### 5. Open generated images
![Open generated images](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nwgqsrd3z30vv14c8i7f.gif)



# Install kubernetes with [k3s](https://k3s.io/)

For this I will use ansible. It makes it easier to do all the install work.
I will use the following repo: https://github.com/k3s-io/k3s-ansible



### Clone the repo
```bash
git clone https://github.com/k3s-io/k3s-ansible.git
```



### Get into the cloned repo
```bash
cd k3s-ansible
```



### Create our inventory from the sample
```bash
cp -R inventory/sample inventory/my-cluster
```
### Edit `inventory/my-cluster/hosts.ini`



```bash
nano inventory/my-cluster/hosts.ini
```
```ini
[master]
192.168.1.100

[node]
192.168.1.101
192.168.1.102
192.168.1.103
192.168.1.104
192.168.1.105

[k3s_cluster:children]
master
node
```



### Edit `inventory/my-cluster/group_vars/all.yml`

In my case edit the `ansible_user` to `ubuntu`

```yaml
---
k3s_version: v1.17.5+k3s1
ansible_user: ubuntu
systemd_dir: /etc/systemd/system
master_ip: "{{ hostvars[groups['master'][0]]['ansible_host'] | default(groups['master'][0]) }}"
extra_server_args: ""
extra_agent_args: ""
```



### Be ready for the power!

Execute the ansible-playbook to install k8s in the nodes.
```bash
ansible-playbook site.yml -i inventory/my-cluster/hosts.ini
```



### Install kubectl in your computer

In my case macOS
```bash
brew install kubectl
```



### Get the kubectl config from any of your **master** nodes
```bash
scp ubuntu@192.168.1.100:~/.kube/config ~/.kube/config
```



### Verify installation.

Check that all nodes are in STATUS 'Ready'
```bash
kubectl get nodes
```



# Deploy test

### Create a local DNS entry for the test
```bash
sudo echo "192.168.1.100 test.com" >> /etc/hosts
```

I'm going to use traefik because is installed by default with k3s.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  labels:
    name: nginx-service
spec:
  ports:
    - port: 80
      name: http
  selector:
    name: nginx-deployment
---

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    kubernetes.io/ingress.class: traefik
spec:
  rules:
  - host: "test.com"
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx-service
          servicePort: 80
```



### Verify pods are up


```
kubectl get pods
```



### Go to `http://test.com` on your browser

```
curl http://test.com
```
Its working!



## Cleanup
Remember to remove the `test.com` line in `/etc/hosts`