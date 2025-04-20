package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {

    List<Device> findByRam(String ram);

    List<Device> findByOperatorSystem(String operator_system);

    List<Device> findByCameraAndStorage(String camera, String storage);

    List<Device> findByBatteryCapacityContaining(String value);

    List<Device> findByDisplayResolutionOrScreenSize(String resolution, String screenSize);

    List<Device> findByProductLine_Id(Integer productLineId);
}
