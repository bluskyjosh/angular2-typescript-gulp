Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.provider :virtualbox do |v|
    v.memory = 2048
    v.cpus = 2
    v.customize ["modifyvm", :id, "--cableconnected1", "on"]
  end
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3306, host: 3303
  config.vm.network "forwarded_port", guest:22, host:2200
  # config.vm.network "private_network", type: "dhcp"
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
  config.vm.provision :shell, path: "vagrant/vagrant-provision.sh"
end
