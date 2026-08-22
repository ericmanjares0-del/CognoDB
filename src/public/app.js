const vehicleSelect = document.getElementById("vehicleSelect");
const vehicleDetails = document.getElementById("vehicleDetails");
const componentsContainer = document.getElementById("components");
const diagnosticsContainer = document.getElementById("diagnostics");

async function loadVehicles() {
    try {
        const response = await fetch("/api/graph/vehicles");
        const result = await response.json();

        vehicleSelect.innerHTML = "";

        result.data.forEach((vehicle) => {
            const option = document.createElement("option");

            option.value = vehicle.id;
            option.textContent =
                `${vehicle.id} - ${vehicle.make} ${vehicle.model}`;

            vehicleSelect.appendChild(option);
        });

        if (result.data.length > 0) {
            loadVehicle(result.data[0].id);
        }

    } catch (error) {
        console.error(error);

        vehicleSelect.innerHTML =
            "<option>Unable to load vehicles</option>";
    }
}

async function loadVehicle(vehicleId) {

    const vehicleResponse =
        await fetch("/api/graph/vehicles");

    const vehicleResult =
        await vehicleResponse.json();

    const vehicle =
        vehicleResult.data.find(v => v.id === vehicleId);

    if (vehicle) {
        vehicleDetails.innerHTML = `
            <div class="vehicle">

                <div class="info-box">
                    <strong>ID</strong>
                    ${vehicle.id}
                </div>

                <div class="info-box">
                    <strong>Make</strong>
                    ${vehicle.make}
                </div>

                <div class="info-box">
                    <strong>Model</strong>
                    ${vehicle.model}
                </div>

                <div class="info-box">
                    <strong>Year</strong>
                    ${vehicle.year}
                </div>

                <div class="info-box">
                    <strong>VIN</strong>
                    ${vehicle.vin}
                </div>

            </div>
        `;
    }

    loadComponents(vehicleId);
    loadDiagnostics(vehicleId);
}

async function loadComponents(vehicleId) {

    try {
        const response =
            await fetch(`/api/graph/vehicles/${vehicleId}/components`);

        const result =
            await response.json();

        componentsContainer.innerHTML = "";

        result.data.forEach(component => {

            const div = document.createElement("div");

            div.className = "component";

            let sensorsHTML = "";

            component.sensors.forEach(sensor => {
                sensorsHTML += `
                    <div class="sensor">
                        🔹 ${sensor.name}
                    </div>
                `;
            });

            div.innerHTML = `
                <strong>🔧 ${component.componentName}</strong>
                ${sensorsHTML}
            `;

            componentsContainer.appendChild(div);
        });

    } catch (error) {

        componentsContainer.innerHTML =
            "Unable to load components.";
    }
}

async function loadDiagnostics(vehicleId) {

    try {

        const response =
            await fetch(`/api/graph/vehicles/${vehicleId}/diagnostics`);

        const result =
            await response.json();

        diagnosticsContainer.innerHTML = "";

        result.data.forEach(diagnostic => {

            const div =
                document.createElement("div");

            div.className =
                `diagnostic ${diagnostic.severity.toLowerCase()}`;

            div.innerHTML = `
                <strong>${diagnostic.code}</strong>
                <p>${diagnostic.description}</p>
                <small>
                    Component: ${diagnostic.componentName}
                    | Severity: ${diagnostic.severity}
                </small>
            `;

            diagnosticsContainer.appendChild(div);
        });

    } catch (error) {

        diagnosticsContainer.innerHTML =
            "Unable to load diagnostics.";
    }
}

vehicleSelect.addEventListener("change", () => {
    loadVehicle(vehicleSelect.value);
});

loadVehicles();
